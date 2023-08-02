import Social from "../social/Social";

const CompanyInfo = ({ company }) => {

  if (!company) return null;

  return (
    <ul className="company-info">
      {/* <li>
        Company size: <span>501-1,000</span>
      </li> */}
      {/* <li>
        Founded in: <span>{company.created_at}</span>
      </li> */}
      {/* <li>
        Phone: <span>123 456 7890</span>
      </li> */}
      {/* <li>
        Website: 
        <a href={company.website} target="_blank" rel="noopener noreferrer">
          {company.website}
        </a>
      </li> */}
      <li>
        Description: <p>{company.description}</p>
      </li>
      {/* <li>
        Social media:
        <Social />
      </li> */}
    </ul>
  );
};

export default CompanyInfo;
