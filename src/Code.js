import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Button from 'react-bootstrap/Button';

require("prismjs/components/prism-csharp");
require("prismjs/components/prism-go");

export default function Code({ title, code, language }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div>
            <div>{title}</div>
            <div className="Code">
                <pre>
                    <code className={`language-${language}`}>{code}</code>
                </pre>
            </div>
            <Button variant="primary" onClick={() => {navigator.clipboard.writeText(code)}}>Copy</Button>
        </div>
    );
}