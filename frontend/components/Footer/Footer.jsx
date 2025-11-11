import React from "react";

export default function Footer() {
const currentYear = new Date().getFullYear();

return (
    <footer
        className="bg-white shadow-md text-primary-dark bottom-0 left-0 w-full"
        style={{ boxShadow: "0 2px 5px 2px rgba(0, 0, 0, 0.2)" }}
    >
        <div>
            <div className="py-2 text-center">
                <span>© {currentYear} - HomeEats by Shuveksha Tuladhar</span>
            </div>
        </div>
    </footer>
);
};

