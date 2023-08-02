import dynamic from "next/dynamic";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import FooterDefault from "../../components/footer/common-footer";
import DefaulHeader from "../../components/header/DefaulHeader";
import MobileMenu from "../../components/header/MobileMenu";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Seo from "../../components/common/Seo";
import CompnayInfo from "../../components/job-single-pages/shared-components/CompanyInfo";
import JobOverView2 from "../../components/job-single-pages/job-overview/JobOverView2";
import ApplyJobModalContent from "../../components/job-single-pages/shared-components/ApplyJobModalContent";
import { useFetch } from "../../hooks/useFetch";
import { NotFoundPage } from "../../components/common/NotFountPage";
import { UserContext } from "../context/UserContext";

const JobSingleDynamicV3 = () => {
  const router = useRouter();
  const jobId = router.query.id;
  const applicationsFetch = useFetch();
  const user = useContext(UserContext);
  const [selectedCv, setSelectedCv] = useState(null);
  const [success, setSuccess] = useState(false);
  const closeBtnRef = useRef();
  const categoryFetch = useFetch();
  const [useProfileCv, setUseProfileCv] = useState(false);

  const jobFetch = useFetch();
  const companyFetch = useFetch();

  useEffect(() => {
    if (jobFetch.data) {
      companyFetch.makeRequest(`/allcompanies/${jobFetch.data.company}/`);
    }
  }, [jobFetch.data]);

  useEffect(() => {
    if (jobId) {
      jobFetch.makeRequest(`/jobs/${jobId}/`);
      categoryFetch.makeRequest('/catagories/');
    }
  }, [jobId]);

  useEffect(() => {
    if (jobFetch.data) {
      applicationsFetch.makeRequest(
        `/allcompanies/${jobFetch.data.company}/applicants/`
      );
    }
  }, [jobFetch.data]);

  const hasAlreadyApplied = useMemo(() => {
    return applicationsFetch.data?.findIndex((app) => (
      app.user.id === user?.id &&
      app.job === jobFetch.data?.id
    )) > -1;
  }, [applicationsFetch.data, user, jobFetch.data])

  const onApplyToJob = useCallback(async () => {
    if (hasAlreadyApplied || (!useProfileCv && !selectedCv)) return;
    setSuccess(false);
    const formData = new FormData();
    if (!useProfileCv) {
      formData.append('cv', selectedCv);
    }
    formData.append('job', jobFetch.data.id);
    const response = await applicationsFetch.makeRequest(
      '/applications/',
      {
        method: 'POST',
        body: formData
      },
      true
    );
    if (response) {
      setSuccess(true);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeBtnRef.current.click();
  }, [jobFetch.data, hasAlreadyApplied, selectedCv, useProfileCv]);

  const onCvChange = useCallback((e) => {
    const [file] = e.target.files;
    if (!file) return;
    setSelectedCv(file);
  }, []);

  if (jobFetch.loading && !jobFetch.data) {
    return (
      <>
        <Seo pageTitle="Job Single Dyanmic V3" />
        <span className="header-span"></span>
        <LoginPopup />
        <DefaulHeader />
        <MobileMenu />
        <h6 className="text-center">Loading...</h6>
      </>
    );
  } else if (!jobFetch.data) {
    return <NotFoundPage />;
  }

  const jobCategory = categoryFetch.data?.find(({ id }) => (
    id === jobFetch.data?.category
  ));

  return (
    <>
      <Seo pageTitle="Job Single Dyanmic V3" />

      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DefaulHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="job-detail-section">
        {success && (
          <h5 className="success text-center mt-5">
            Your application has successfully been sent!😊
          </h5>
        )}
        {applicationsFetch.error && (
          <h5 className="error text-center mt-5">
            Something went wrong, please try again later🥲
          </h5>
        )}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/* <!-- job block outer --> */}

                <div className="job-overview-two">
                  <h4>Job Description</h4>
                  <JobOverView2 category={jobCategory} job={jobFetch.data} />
                </div>
                {/* <!-- job-overview-two --> */}

                {jobFetch.data.tag && (
                  <div className="job-detail mb-5">
                    <h4>Job Tags: </h4>
                    <ul className="post-tags d-flex">
                      {jobFetch.data.tag.split(' ').map((val, i) => (
                        <li key={i}>{val}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {jobFetch.data.required_skills && (
                  <div className="job-detail mb-5">
                    <h4>Required Skills: </h4>
                    <ul className="post-tags d-flex">
                      {jobFetch.data.required_skills?.split(' ').map((val, i) => (
                        <li key={i}>{val}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {jobFetch.data.description && (
                  <div className="job-detail">
                    <h4>Description: </h4>
                    <p>{jobFetch.data.description}</p>
                  </div>
                )}
                {/* <JobDetailsDescriptions job={jobFetch.data} /> */}

                {/* End job-details */}

                {/* <div className="other-options">
                  <div className="social-share">
                    <h5>Share this job</h5>
                    <SocialTwo />
                  </div>
                </div> */}
                {/* <!-- Other Options --> */}
              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo">
                          <img
                            src={process.env.NEXT_PUBLIC_API_URL + companyFetch.data?.company_logo}
                            alt="resource"
                          />
                        </div>
                        <h5 className="company-name">
                          {companyFetch.data?.title}
                        </h5>
                        {/* <a href="#" className="profile-link">
                          View company profile
                        </a> */}
                      </div>
                      {/* End company title */}

                      <CompnayInfo company={companyFetch.data} />

                      <div className="btn-box">
                        <a
                          href={companyFetch.data?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          Visit website
                        </a>
                      </div>
                      {/* End btn-box */}
                    </div>
                  </div>
                  {!user.is_employer && (
                    <div className="btn-box d-flex flex-column">
                      <button
                        disabled={hasAlreadyApplied || success}
                        className="theme-btn btn-style-one"
                        data-bs-toggle="modal"
                        data-bs-target="#applyJobModal"
                      >
                        Apply For Job
                      </button>
                      {(hasAlreadyApplied || success) && (
                        <span className="mt-2">
                          You have already applied for this position before
                        </span>
                      )}
                      {/* <button className="bookmark-btn">
                        <i className="flaticon-bookmark"></i>
                      </button> */}
                    </div>
                  )}
                  {/* End apply for job btn */}

                  {/* <!-- Modal --> */}
                  <div
                    className="modal fade"
                    id="applyJobModal"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="apply-modal-content modal-content">
                        <div className="text-center">
                          <h3 className="title">Apply for this job</h3>
                          <button
                            type="button"
                            className="closed-modal"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ref={closeBtnRef}
                          />
                        </div>
                        <div className="input-group checkboxes square mb-2">
                          <input
                            type="checkbox"
                            onChange={() => setUseProfileCv(prev => !prev)} 
                            checked={useProfileCv}
                            name="useProfileCv"
                            id="useProfileCv"
                          />
                          <label htmlFor="useProfileCv" className="remember">
                            <span className="custom-checkbox"></span> Use CV from my profile
                          </label>
                        </div>
                        {/* End modal-header */}

                        <ApplyJobModalContent
                          useProfileCv={useProfileCv}
                          onApply={onApplyToJob}
                          onFileChange={onCvChange}
                          file={selectedCv}
                        />
                        {/* End PrivateMessageBox */}
                      </div>
                      {/* End .send-private-message-wrapper */}
                    </div>
                  </div>
                  {/* End .modal */}

                  {/* End .company-widget */}

                  {/* <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div> */}
                  {/* End contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
            {/* End .row  */}

            {/* <div className="related-jobs">
              <div className="title-box">
                <h3>Related Jobs</h3>
                <div className="text">2020 jobs live - 293 added today.</div>
              </div>
              <div className="row">
                <RelatedJobs2 />
              </div>
            </div> */}
            {/* <!-- Related Jobs --> */}
          </div>
          {/* End auto-container */}
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      <FooterDefault footerStyle="alternate5" />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV3), {
  ssr: false,
});
