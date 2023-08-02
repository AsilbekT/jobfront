import { useContext } from "react";
import { UserContext } from "../../../pages/context/UserContext";

const ApplyJobModalContent = ({
  onFileChange,
  onApply,
  file,
  useProfileCv
}) => {
  const user = useContext(UserContext);

  const cvFilename = user?.cv.split('/').at(-1);

  return (
    <div className="default-form job-apply-form">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="uploading-outer apply-cv-outer">
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
                onChange={onFileChange}
                accept="image/*, application/pdf"
                id="upload-rt"
                required={!useProfileCv}
                disabled={useProfileCv}
                readOnly={useProfileCv}
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor="upload-rt"
              >
                {(useProfileCv && user?.cv) 
                  ? cvFilename 
                  : (file ? file.name : 'Upload CV (pdf, png, jpg)')
                }
              </label>
            </div>
          </div>
        </div>
        {/* End .col */}

        {/* <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message"
            required
          ></textarea>
        </div> */}
        {/* End .col */}

        {/* <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="input-group checkboxes square">
            <input type="checkbox" name="remember-me" id="rememberMe" />
            <label htmlFor="rememberMe" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <span data-bs-dismiss="modal">
                <Link href="/terms">
                  Terms and Conditions and Privacy Policy
                </Link>
              </span>
            </label>
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one w-100"
            type="submit"
            name="submit-form"
            onClick={onApply}
          >
            Apply Job
          </button>
        </div>
        {/* End .col */}
      </div>
    </div>
  );
};

export default ApplyJobModalContent;
