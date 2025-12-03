import Sidebar from "../common/sidebar/Sidebar";


const SidebarLayout = ({ children }) => {
  return (
    <section className="container-fluid mainSection">
      <div className="containerProfile d-flex gap-4 px-0" >
        <article className="containerSidebar">
          <Sidebar></Sidebar>
        </article>
        <article className="containerChildren">{children}</article>
      </div>
    </section>
  );
};

export default SidebarLayout;