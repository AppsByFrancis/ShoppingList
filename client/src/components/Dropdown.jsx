import './css/dropdown.css';

const Dropdown = ({language, setLanguage}) => {
    return(
        <div className="dropdown">
            <button className="dropbtn">{language === "english" ? "switch language" : "změnit jazyk"}</button>
            <div className="dropdown-content">
                <p onClick={() => {
                    if(language === "english"){
                        setLanguage("czech")
                    } else {
                        setLanguage("english")
                    }
                }}>{language === "english" ? "čeština" : "english"}</p>
            </div>
        </div>
    )
}

export default Dropdown;