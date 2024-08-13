'use client';
import Link from "next/link";

export function FooterContact() {
  return (<>
      <h3 className="font-bold">Contact Us</h3>
      <Link className="hover:text-blue-400" href="mailto:obo_nasipit@gmail.com" target="_blank" title="Click to send email">Email: obo_nasipit@gmail.com</Link>
      <span>Contact No: (085) 283-3813</span>
    </>
  )
}