import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Button from 'react-bootstrap/Button';
import { Files } from 'react-bootstrap-icons';

require("prismjs/components/prism-csharp");
require("prismjs/components/prism-go");

export default function Code({ title, code, language }) {
    const [showCopyButton, setShowCopyButton] = useState(false);
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div>
            <div>{title}</div>
            <div className="Code" style={{ position: "relative" }}
                onMouseEnter={(e) => setShowCopyButton(true)}
                onMouseLeave={(e) => setShowCopyButton(false)}>
                <pre>
                    <code className={`language-${language}`}>{code}</code>
                </pre>
                {showCopyButton && <Button variant="outline-secondary"
                    onClick={() => { navigator.clipboard.writeText(code) }}
                    style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}>
                    <Files />
                </Button>}
            </div>
        </div>
    );
}