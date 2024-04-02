import { CButton } from "../CButton/CButton";
import { CInput } from "../CInput/CInput";
import { useEffect, useState } from "react";

export const CTable = ({ className, data, editFunction, deleteFunction }) => {
    return (
        <div className={className}>
            {data.map((item, index) => {
                const [isEditable, setIsEditable] = useState(false);
                const [editedItem, setEditedItem] = useState(item);
                const [originalItem, setOriginalItem] = useState("");

                const handleEdit = () => {
                    setIsEditable(!isEditable);
                    setOriginalItem(item);
                    editFunction(item);
                };

                const handleChange = (e, key) => {
                    setEditedItem((prevState) => ({
                        ...prevState,
                        [key]: e.target.value,
                    }));
                }

                // useEffect(() => {
                //     if (isEditable) {
                //         console.log("editedItem", editedItem);
                //         console.log(e);
                //     }
                // }, [editedItem]);

                return (
                    <div key={index}>
                        {Object.keys(item).map((key) => (
                            <div key={key}>
                                <CInput 
                                    className={"table-input"}
                                    type={"text"}
                                    name={key}
                                    disabled={!isEditable}
                                    value={editedItem[key] || ""}
                                    onChange={(e) => handleChange(e, key)}
                                />
                            </div>
                        ))}
                        {isEditable 
                        ?
                            <>
                                <CButton 
                                    title={"Save"}
                                    onClickFunction={() => {
                                        setIsEditable(!isEditable);
                                        editFunction(editedItem);
                                    }}
                                />
                                <CButton 
                                    title={"Cancel"}
                                    onClickFunction={() => setIsEditable(!isEditable)}
                                />
                            </>
                        :
                            <>
                                <CButton 
                                    title={"Edit"}
                                    onClickFunction={handleEdit}
                                />
                                <CButton
                                    title={"Delete"}
                                    onClickFunction={() => deleteFunction(item)}
                                />
                            </>
                        }
                    </div>
                );
            })}
        </div>
    );
};