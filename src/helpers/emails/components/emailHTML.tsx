import Footer from "./footer";
import Header from "./header";
import { Html } from "@react-email/html";
import DOMPurify from "dompurify";
import "./email.css";

const EmailHTML = ({ body }: { body: string | undefined }) => {
  const sanitizedBody = body
    ? DOMPurify.sanitize(body, {
        USE_PROFILES: { html: true },
        ALLOWED_ATTR: [
          "style",
          "src",
          "alt",
          "width",
          "height",
          "align",
          "border",
        ],
      })
    : "";

  return (
    <Html lang="pt-BR">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </head>
      <body>
        <table
          role="presentation"
          cellSpacing={0}
          cellPadding={0}
          border={0}
          width="100%"
        >
          <tr>
            <td align="center" style={{ padding: "20px 0" }}>
              <table
                role="presentation"
                cellSpacing={0}
                cellPadding={0}
                border={0}
                width="600px"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Header />
                <tr style={{ maxWidth: "600px" }}>
                  <td
                    id="email-body"
                    style={{
                      padding: "30px",
                      fontSize: "16px",
                      lineHeight: "1.5",
                      color: "#333",
                    }}
                    dangerouslySetInnerHTML={{ __html: sanitizedBody }}
                  />
                </tr>
                <Footer />
              </table>
            </td>
          </tr>
        </table>
      </body>
    </Html>
  );
};

export default EmailHTML;
