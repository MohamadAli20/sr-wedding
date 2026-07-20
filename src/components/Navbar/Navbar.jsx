import {useEffect,useState} from 'react'; 
import {FaBars,FaTimes} from 'react-icons/fa'; 
import './Navbar.css';

const links=[
    ['Home','home'],
    ['Our Story','story'],
    ['Wedding','wedding'],
    ['Entourage', 'entourage'],
    ['Gallery','gallery'],
    ['Gift Registry','gifts'],
    ['RSVP','rsvp']
];

export default function Navbar(){
    const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
    
    useEffect(()=>{
        const f=()=>setScrolled(scrollY>24);
        addEventListener('scroll',f);
        return()=>removeEventListener('scroll',f)},[]);
        
        return <header className={`navbar ${scrolled?'is-scrolled':''}`}>
            <a className="monogram" href="#home" aria-label="Saifudin and Rea Mae home">
                <img src="/images/saifudin-rea-mae-logo.png" alt="Saifudin and Rea Mae"/>
                </a>
                    <button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<FaTimes/>:<FaBars/>}</button>
                    <nav className={
                        open?'open':''}>{
                        links.map(([label,id])=><a href={`#${id}`} onClick={()=>setOpen(false)} key={id}>{label}
                        </a>)}
                    
                    </nav>
                    
        </header>
}
