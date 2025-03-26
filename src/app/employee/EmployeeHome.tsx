import { EducHome } from "./educationInfo/EducHome"
import { EmpNav } from "./EmpNav"
import { ExperienceHome } from "./experience/ExperienceHome"
import { FamilyHome } from "./familyInfo/FamilyHome"
import { PersonalInfoForm } from "./personalInfo/PersonalInfoForm"


export const EmployeeHome = () => {
  return (
    <section>
     
      <div>
        <EmpNav/>
      </div>
      <div>
        
     <PersonalInfoForm/>
     <EducHome/>
     <ExperienceHome/>
     <FamilyHome/>
      </div>
      </section>
  )
}
