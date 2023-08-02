import { useState } from "react";
import { useFetch } from "../../../../../../hooks/useFetch";
import { useContext } from "react";
import { UserContext } from "../../../../../../pages/context/UserContext";
import { useEffect } from "react";

const LogoUpload = ({ title = 'Profile Image', }) => {
    const [logImg, setLogoImg] = useState(null);
    const uploadFetch = useFetch();

    const user = useContext(UserContext);

    useEffect(() => {
        if (user) {
            const fileName = user?.avatar.split('/').at(-1);
            setLogoImg({ name: fileName || '' });
        }
    }, [user]);

    const logImgHander = async (e) => {
        const [logoImg] = e.target.files;
        const formData = new FormData();
        formData.append('avatar', logoImg);
        await uploadFetch.makeRequest(`/user/${user.id}/upload_files/`, {
            method: 'PATCH',
            body: formData
        });
        setLogoImg(logImg);
    };

    return (
        <>
            <div className="uploading-outer">
                <label className="w-25">{title}</label>
                <div className="uploadButton">
                    <input
                        className="uploadButton-input"
                        type="file"
                        accept="image/*"
                        id="upload-t"
                        onChange={logImgHander}
                    />
                    <label
                        className="uploadButton-button ripple-effect"
                        htmlFor="upload-t"
                    >
                        {logImg ? logImg.name : "Browse Image"}
                    </label>
                    <span className="uploadButton-file-name"></span>
                </div>
                <div className="text">
                    Max file size is 1MB, Minimum dimension: 330x300 And
                    Suitable files are .jpg & .png
                </div>
            </div>
        </>
    );
};

export default LogoUpload;
