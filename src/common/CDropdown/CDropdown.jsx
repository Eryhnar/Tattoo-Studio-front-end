import "./CDropdown.css";
import { useState } from "react";

// export const CDropdown = ({ title, items }) => {
//     // return (
//     //     <div className="dropdown">
//     //         <button className="dropbtn">{title}</button>
//     //         <div className="dropdown-content">
//     //             {items.map((item, index) => (
//     //                 <a key={index} href={item.path}>{item.title}</a>
//     //             ))}
//     //         </div>
//     //     </div>
//     // );

//     return (
//         <select>
//           {items.map(item => (
//             <option key={item.id} value={item.id}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//       );
// }

export const CDropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={toggleOpen}>{title}</button>
            {isOpen && (
                <div className="dropdown-content">
                    {items.map((item, index) => (
                        // <a key={index} href="#">{item}</a>
                        <div key={index}>{item}</div> 
                    ))}
                </div>
            )}
        </div>
    );
}