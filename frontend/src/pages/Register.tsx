import { useEffect, useState } from "react";
import Select from "react-select";
import Bgmi from "../components/Forms/Bgmi";
import MobileLegend from "../components/Forms/MobileLegend";
import { Quantum } from "ldrs/react"; 
import CommonForm from "../components/Forms/CommonForm";
import axios from "../utils/axios";
type OptionType = {
  value: string;
  label: string;
};

const customStyles = {
  menuPortal: (provided: any) => ({ ...provided, zIndex: 9999 }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
  control: (base: any) => ({
    ...base,
    backgroundColor: "#1f2937",
    borderColor: "#374151",
    color: "white",
    "&:hover": { borderColor: "#4b5563" },
  }),
  option: (base: any, { isFocused, isSelected }: any) => ({
    ...base,
    backgroundColor: isSelected ? "#2563eb" : isFocused ? "#374151" : "#1f2937",
    color: isSelected ? "white" : "#d1d5db",
    padding: "10px",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "white",
  }),
  input: (base: any) => ({
    ...base,
    color: "white",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#d1d5db",
  }),
};

const options: OptionType[] = [
  {
    value: "structuralModelling",
    label: "Structural Modelling (Technical Event)",
  },
  { value: "autocadDesign", label: "Autocad Design (Technical Event)" },
  { value: "codeDebugging", label: "Code Debugging (Technical Event)" },
  { value: "codeJumbling", label: "Code Jumbling (Technical Event)" },
  { value: "projectShowcase", label: "Project Showcase (Technical Event)" },
  { value: "circuitDesign", label: "Circuit Design (Technical Event)" },
  { value: "paperWindmill", label: "Paper Windmill (Technical Event)" },
  {
    value: "machineDesignAutocad",
    label: "Machine Design Autocad (Technical Event)",
  },
  {
    value: "electricalComponent",
    label: "Electrical Component Identification & Modelling (Technical Event)",
  },
  { value: "painting", label: "Painting (Spot Event)" },
  { value: "photography", label: "Photography (Spot Event)" },
  { value: "treasureHunt", label: "Treasure Hunt (Spot Event)" },
  { value: "rubikCube", label: "Rubik's Cube (Spot Event)" },
  { value: "quiz", label: "Quiz (Literary Event)" },
  { value: "debate", label: "Debate (Literary Event)" },
  { value: "tekken", label: "Tekken 7 (Gaming)" },
  { value: "bgmi", label: "Bgmi (Gaming)" },
  { value: "mobileLegend", label: "Mobile Legend (Gaming)" },
  { value: "fifa", label: "FC24 (Gaming)" },
  { value: "lightVocal", label: "Light Vocal Solo (Voice of RESO)" },
  { value: "westernSolo", label: "Western Solo Unplugged (Voice of RESO)" },
  { value: "classicalFolk", label: "Classical & Folk (Dance Contest)" },
  { value: "dance", label: "Modern (Dance Contest)" },
  { value: "cosplay", label: "Cosplay Contest" },
  { value: "reel", label: "Reel Contest" },
];

const Register = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [registrationOpen, setRegistrationOpen] = useState<boolean | null>(
    null
  );
  
  // Mapping special components
  const specialComponents: Record<string, React.ElementType> = {
    bgmi: Bgmi,
    mobileLegend: MobileLegend,
  };

  // Determine the component to use
  const SelectedComponent =
    selectedOption?.value && specialComponents[selectedOption.value]
      ? specialComponents[selectedOption.value]
      : CommonForm;

  // Fetch the registration status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("/users/status");
        setRegistrationOpen(response.data.registrationOpen);
      } catch (err) {
        console.error("Error fetching registration status", err);
        setRegistrationOpen(true); 
      }
    };

    fetchStatus();
  }, []);

  if (registrationOpen === null) {
    return (
      <div className="h-dvh flex justify-center items-center bg-black">
        <Quantum size="150" speed="4" color="blue" />
      </div>
    );
  }

  if (!registrationOpen) {
    return (
      <div className="h-dvh flex flex-col justify-center items-center bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">🚫 Registration Closed</h1>
        <p className="text-lg text-gray-400">Please check back later!</p>
      </div>
    );
  }

  return (
    <div className="bg-black flex items-center justify-center ">
      <div className="pt-2 w-3/5 ">
        <h1 className="text-3xl text-white font-bold mb-3">Event to participate -</h1>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isSearchable
          placeholder="Event"
          className="text-white mb-2"
          styles={customStyles}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />

        {selectedOption ? (
          <SelectedComponent event={selectedOption.value} />
        ) : (
          <div className="h-dvh flex justify-center items-center">
            <Quantum size="150" speed="4" color="blue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
