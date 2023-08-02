import dayjs from "dayjs";
import { BiCategory } from "react-icons/bi";
import { jobTypesMap } from "../../../data/job-types";

const JobOverView2 = ({ job, category = {} }) => {

  if (!job) return null;

  const postedTimeDifference = dayjs().subtract(+dayjs(job.created_at), 'milliseconds');

  return (
    <ul>
      <li>
        <i className="icon icon-calendar"></i>
        <h5>Date Posted:</h5>
        <span>Posted {postedTimeDifference.get('hours')} hours {postedTimeDifference.get('minutes')} minutes ago</span>
      </li>
      <li>
        <i className="icon icon-expiry"></i>
        <h5>Job Type: </h5>
        <span>{jobTypesMap[job.job_type]}</span>
      </li>
      <li>
        <i className="icon icon-location"></i>
        <h5>Location:</h5>
        <span>{job.location}</span>
      </li>
      <li>
        <i className="icon icon-user-2"></i>
        <h5>Job Title:</h5>
        <span>{job.job_title}</span>
      </li>
      {/* <li>
        <i className="icon icon-clock"></i>
        <h5>Hours:</h5>
        <span>50h / week</span>
      </li>
      <li>
        <i className="icon icon-rate"></i>
        <h5>Rate:</h5>
        <span>$15 - $25 / hour</span>
      </li> */}
      <li>
        <i className="icon icon-salary"></i>
        <h5>Salary:</h5>
        <span>${job.salary}</span>
      </li>
      {category.title && (
        <li className="d-flex align-items-center gap-4">
          <BiCategory style={{ width: '25px', height: '25px' }} fill="#1967d2" />
          <div className="d-flex flex-column">
            <h5>Category:</h5>
            <span>{category.title}</span>
          </div>
        </li>
      )}
    </ul>
  );
};

export default JobOverView2;
