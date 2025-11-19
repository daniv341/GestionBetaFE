import Sidebar from "../common/sidebar/Sidebar";


const SidebarLayout = ({ children }) => {
  return (
    <section className="container-fluid mainSection">
      <div className="row containerProfile">
        <article className="col-md-4 col-lg-3 col-xxl-2 px-0 min-h-screen">
          <Sidebar></Sidebar>
        </article>
        <article className="col-md-8 col-lg-9 col-xxl-10 ps-xxl-0">{children}</article>
      </div>
    </section>
  );
};

export default SidebarLayout;