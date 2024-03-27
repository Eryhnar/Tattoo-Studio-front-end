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

// export const CDropdown = ({ buttonClass, dropdownClass, title, items }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleOpen = () => setIsOpen(!isOpen);

//     return (
//         <div className={buttonClass}>
//             <button className="dropbtn" onClick={toggleOpen}>{title}</button>
//             {isOpen && (
//                 <div className={dropdownClass}>
//                     {items.map((item, index) => (
//                         <div className="dropdown-item" key={index}>{item}</div> 
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

export const CDropdown = ({ buttonClass, dropdownClass, title, items, onChangeFunction }) => {
    return (
        <select className={buttonClass} onChange={onChangeFunction} name={title}>
            <option value="" disabled selected> {title} </option>
            {items.map((item, index) => (
                <option key={index} value={item} className={dropdownClass}>{item}</option>
            ))}
        </select>
    );
}