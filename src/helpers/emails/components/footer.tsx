const Footer = () => {
  const urlImage =
    "https://api.kiandadiversidade.com/wp-content/uploads/2025/assets/email_footer.png";
  return (
    <tr>
      <td align="center" style={{ maxWidth: "100%", marginTop: "32px" }}>
        <img
          src={urlImage}
          alt="Footer"
          style={{
            width: "600px",
            maxWidth: "100%",
            border: 0,
            display: "block",
          }}
        />
      </td>
    </tr>
  );
};

export default Footer;
