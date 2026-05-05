function Navbar({ activePage, setActivePage }) {
  const links = [
    "الرئيسية",
    "لوحة الطالب",
    "اضافة اعلان",
    "المحادثات",
    "لوحة الادارة",
  ];

  return (
    <header className="navbar-custom">
      <div className="container">
        <ul className="nav justify-content-center gap-2">
          {links.map((link) => (
            <li className="nav-item" key={link}>
              <button
                className={`nav-link-custom ${
                  activePage === link ? "active" : ""
                }`}
                onClick={() => setActivePage(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;