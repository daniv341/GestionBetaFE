import Sidebar from "../common/sidebar/Sidebar";

const SidebarLayout = ({ children }) => {
  return (
    <section className="d-flex">
      <Sidebar></Sidebar>

      <article className="containerChildren">
        <div> {children}</div>
      </article>
    </section>
  );
};

export default SidebarLayout;
