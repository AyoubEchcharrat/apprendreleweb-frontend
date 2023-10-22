import './section.css'
import React from 'react'

export default function Section({title,content}) {
    const contentWithLineBreaks = content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
        {line}
        <br />
        <br />
      </React.Fragment>
      ));
    return (      
    <section className="section_container">
        <p className="section_title">{title}</p>
        <p className="section_response">{contentWithLineBreaks}</p>
    </section>
    )
}