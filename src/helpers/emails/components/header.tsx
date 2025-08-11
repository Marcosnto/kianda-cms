const Header = () => {
  const urlImage =
    "https://api.kiandadiversidade.com/wp-content/uploads/2025/assets/email_header.png";
  return (
    <tr>
      <td align="center" style={{ maxWidth: "100%", marginBottom: "24px" }}>
        <img
          src={urlImage}
          alt="Header"
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

export default Header;
