import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ProfileView() {
  const { profile_id } = useParams();

  const [profile, setProfile] = useState({
    orcid: "",
    name: "",
    lastName: "",
    birthday: "",
    degree: ""
  });

  const [articles, setArticles] = useState([]); // separate state for articles

  // Fetch profile info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profiles/${profile_id}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, [profile_id]);

  // Fetch articles separately
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get(`/profiles/${profile_id}/articles`);
        setArticles(response.data); // assume array of { title, journal, year, doi }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, [profile_id]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="p-5 shadow-lg rounded-4" style={{ background: "#f8f9fa" }}>
            <h3 className="text-center mb-4 fw-bold">Profile Information</h3>

            <div className="mb-3"><strong>ORCID:</strong> {profile.orcid || "—"}</div>
            <div className="mb-3"><strong>First Name:</strong> {profile.name || "—"}</div>
            <div className="mb-3"><strong>Last Name:</strong> {profile.lastName || "—"}</div>
            <div className="mb-3"><strong>Birthday:</strong> {profile.birthday || "—"}</div>
            <div className="mb-3"><strong>Degree:</strong> {profile.degree || "—"}</div>

            {/* Articles Section */}
            <div className="mt-4">
              <h5>Articles</h5>
              {articles.length > 0 ? (
                <ul className="list-group">
                  {articles.map((article, idx) => (
                    <li key={idx} className="list-group-item">
                      <strong>{article.title}</strong> — {article.journal || "Unknown Journal"} ({article.year || "—"})
                      {article.doi && <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer" className="ms-2">DOI</a>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No articles yet.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}