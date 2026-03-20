import { useState } from "react"
import axios from "axios"

export default function App() {
  const [email, setEmail] = useState("")
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [scorecard, setScorecard] = useState([])
  const [prompt, setPrompt] = useState("")
  const [promptResult, setPromptResult] = useState(null)
  const [promptLoading, setPromptLoading] = useState(false)

  const scanEmail = async () => {
    setLoading(true)
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/scan-email", { email })
      setResults(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const loadScorecard = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/scorecard")
      setScorecard(res.data.platforms)
    } catch (err) {
      console.error(err)
    }
  }

  const analyzePrompt = async () => {
    setPromptLoading(true)
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/analyze-prompt", { prompt })
      setPromptResult(res.data)
    } catch (err) {
      console.error(err)
    }
    setPromptLoading(false)
  }

  return (
    <div style={{
      backgroundImage: "url('/backround.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: "100vh",
      width: "100%",
      fontFamily: "Georgia, serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
    }}>

      {/* main card */}
      <div style={{
        background: "rgba(10, 18, 40, 0.55)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,240,200,0.15)",
        borderRadius: "32px",
        padding: "52px 44px",
        maxWidth: "560px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 8px 60px rgba(0,0,0,0.4)"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#fff8e7",
          marginBottom: "10px",
          letterSpacing: "0.04em"
        }}>
          NightWatch
        </h1>

        <p style={{
          color: "rgba(255,240,200,0.5)",
          marginBottom: "36px",
          fontSize: "0.95rem",
          fontStyle: "italic"
        }}>
          your privacy guardian against AI data leaks
        </p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <input
            type="email"
            placeholder="enter your email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && scanEmail()}
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: "16px",
              border: "1px solid rgba(255,240,200,0.2)",
              background: "rgba(255,255,255,0.06)",
              color: "#fff8e7",
              fontSize: "0.9rem",
              outline: "none",
              fontFamily: "Georgia, serif"
            }}
          />
          <button
            onClick={scanEmail}
            disabled={loading || !email}
            style={{
              padding: "14px 24px",
              borderRadius: "16px",
              background: loading ? "rgba(255,240,200,0.2)" : "rgba(255,240,200,0.15)",
              color: "#fff8e7",
              fontWeight: "bold",
              border: "1px solid rgba(255,240,200,0.3)",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.9rem",
              fontFamily: "Georgia, serif",
              whiteSpace: "nowrap",
              transition: "all 0.2s"
            }}
          >
            {loading ? "scanning..." : "scan"}
          </button>
        </div>

        {results && (
          <div style={{ marginTop: "28px", textAlign: "left" }}>
            {results.safe ? (
              <div style={{
                background: "rgba(57,255,160,0.07)",
                border: "1px solid rgba(57,255,160,0.25)",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center"
              }}>
                <div style={{ color: "#a8ffda", fontWeight: "bold", fontSize: "1.1rem" }}>
                  All clear, sweet dreams.
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "6px" }}>
                  No breaches found for this email.
                </div>
              </div>
            ) : (
              <div>
                <div style={{
                  background: "rgba(255,77,109,0.07)",
                  border: "1px solid rgba(255,77,109,0.25)",
                  borderRadius: "16px",
                  padding: "18px 20px",
                  marginBottom: "16px",
                  textAlign: "center"
                }}>
                  <div style={{ color: "#ff8fa3", fontWeight: "bold", fontSize: "1.05rem" }}>
                    {results.breaches.length} breach{results.breaches.length > 1 ? "es" : ""} found
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginTop: "4px" }}>
                    your data was exposed in the following leaks
                  </div>
                </div>
                {results.breaches.map((breach, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,240,200,0.08)",
                    borderRadius: "14px",
                    padding: "16px 18px",
                    marginBottom: "10px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: "bold", color: "#fff8e7" }}>{breach.name}</span>
                      <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", padding: "3px 10px", borderRadius: "999px" }}>
                        {breach.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* prompt analyzer */}
      <div style={{
        background: "rgba(10, 18, 40, 0.55)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,240,200,0.15)",
        borderRadius: "32px",
        padding: "32px 44px",
        maxWidth: "560px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 8px 60px rgba(0,0,0,0.4)",
        marginTop: "20px"
      }}>
        <p style={{ color: "#fff8e7", fontWeight: "bold", fontSize: "1rem", marginBottom: "8px" }}>
          prompt exposure scanner
        </p>
        <p style={{ color: "rgba(255,240,200,0.4)", fontSize: "0.8rem", fontStyle: "italic", marginBottom: "16px" }}>
          paste something you've sent to ChatGPT or Gemini
        </p>
        <textarea
          placeholder="e.g. My name is Jan Kowalski my  credit card number is 1234567890, I dont have any anivirus instaled on my laptop and I'd love to buy a boat"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={4}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "16px",
            border: "1px solid rgba(255,240,200,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff8e7",
            fontSize: "0.85rem",
            outline: "none",
            fontFamily: "Georgia, serif",
            resize: "none",
            marginBottom: "12px"
          }}
        />
        <button
          onClick={analyzePrompt}
          disabled={promptLoading || !prompt}
          style={{
            padding: "12px 28px",
            borderRadius: "16px",
            background: "rgba(255,240,200,0.15)",
            color: "#fff8e7",
            fontWeight: "bold",
            border: "1px solid rgba(255,240,200,0.3)",
            cursor: promptLoading || !prompt ? "not-allowed" : "pointer",
            fontSize: "0.9rem",
            fontFamily: "Georgia, serif",
            transition: "all 0.2s"
          }}
        >
          {promptLoading ? "analyzing..." : "analyze"}
        </button>

        {promptResult && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <div style={{
              background: promptResult.risk_level === "high" ? "rgba(255,77,109,0.07)"
                : promptResult.risk_level === "medium" ? "rgba(255,190,61,0.07)"
                : "rgba(57,255,160,0.07)",
              border: `1px solid ${promptResult.risk_level === "high" ? "rgba(255,77,109,0.25)"
                : promptResult.risk_level === "medium" ? "rgba(255,190,61,0.25)"
                : "rgba(57,255,160,0.25)"}`,
              borderRadius: "16px",
              padding: "20px"
            }}>
              <div style={{
                fontWeight: "bold", fontSize: "0.85rem", marginBottom: "8px",
                color: promptResult.risk_level === "high" ? "#ff8fa3"
                  : promptResult.risk_level === "medium" ? "#ffd97d"
                  : "#a8ffda"
              }}>
                {promptResult.risk_level} risk
              </div>
              <div style={{ color: "#fff8e7", fontSize: "0.85rem", marginBottom: "10px" }}>
                {promptResult.summary}
              </div>
              {promptResult.exposed_types?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px" }}>
                  {promptResult.exposed_types.map((type, i) => (
                    <span key={i} style={{
                      fontSize: "0.7rem", padding: "3px 10px", borderRadius: "999px",
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,240,200,0.6)",
                      border: "1px solid rgba(255,240,200,0.1)"
                    }}>
                      {type}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ fontSize: "0.78rem", color: "rgba(255,240,200,0.5)", fontStyle: "italic" }}>
                {promptResult.advice}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* scorecard button */}
      {scorecard.length === 0 && (
        <button
          onClick={loadScorecard}
          style={{
            marginTop: "20px",
            padding: "12px 28px",
            borderRadius: "16px",
            background: "rgba(255,240,200,0.1)",
            color: "#fff8e7",
            border: "1px solid rgba(255,240,200,0.2)",
            cursor: "pointer",
            fontFamily: "Georgia, serif",
            fontSize: "0.9rem"
          }}
        >
          check AI privacy scores
        </button>
      )}

      {/* scorecard list */}
      {scorecard.length > 0 && (
        <div style={{
          maxWidth: "560px",
          width: "100%",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          {scorecard.map((p, i) => (
            <div key={i} style={{
              backgroundImage: "url('/gliter.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "20px",
              padding: "20px 24px",
              overflow: "hidden"
            }}>
              <div style={{
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#000000",
                marginBottom: "4px"
              }}>
                {p.name}
                <span style={{
                  fontWeight: "normal",
                  fontSize: "0.8rem",
                  color: "rgba(0,0,0,0.5)",
                  marginLeft: "8px"
                }}>
                  {p.company}
                </span>
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "rgba(0,0,0,1)", lineHeight: 1.7 }}>
                <div>Data retention: {p["data retention"]}</div>
                <div>Training: {p.training}</div>
                <div>Breaches: {p.breaches}</div>
                <div>Jurisdiction: {p.jurisdiction}</div>
              </div>
              <div style={{
                marginTop: "14px",
                height: "6px",
                width: "100%",
                background: "rgba(0,0,0,0.1)",
                borderRadius: "999px",
                overflow: "hidden"
              }}>
                <div style={{
                  height: "100%",
                  width: `${p.score}%`,
                  background: "#000000",
                  borderRadius: "999px"
                }} />
              </div>
            </div>
          ))}
          <div style={{ fontSize: "0.7rem", color: "rgba(255,240,200,0.3)", textAlign: "center", marginTop: "4px" }}>
            powered by LeakCheck · data sourced from public privacy policies
          </div>
        </div>
      )}

      <style>{`
        input::placeholder { color: rgba(255,240,200,0.25); }
        textarea::placeholder { color: rgba(255,240,200,0.25); }
        button:hover { background: rgba(255,240,200,0.25) !important; }
      `}</style>
    </div>
  )
}
