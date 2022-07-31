import React from "react";

const Footer = () => {
return (
    <div>
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; R.A.M. 2022</div>
                    <div>
                        <a href="src/components/events/Events#">Privacy Policy</a>
                        &middot;
                        <a href="src/components/events/Events#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
);
}
export default Footer;