import React from 'react'
import './footer.scss'

interface FooterProps {
}

export default function Footer({}: FooterProps) {
    return (
      <footer className="frontFooter">
          <p>This site was created with ❤ by <a>m1k3y</a></p>
      </footer>
    )
}