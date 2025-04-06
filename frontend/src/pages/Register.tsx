import { useState } from "react";
import Select from "react-select";
import Bgmi from "../components/Forms/Bgmi";
import MobileLegend from "../components/Forms/MobileLegend";
import { Quantum } from "ldrs/react";
import CommonForm from "../components/Forms/CommonForm";

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
    value: "structural_modelling",
    label: "Structural Modelling (Technical Event)",
  },
  { value: "autocad_design", label: "Autocad Design (Technical Event)" },
  { value: "code_debugging", label: "Code Debugging (Technical Event)" },
  { value: "code_jumbling", label: "Code Jumbling (Technical Event)" },
  { value: "project_showcase", label: "Project Showcase (Technical Event)" },
  { value: "circuit_design", label: "Circuit Design (Technical Event)" },
  { value: "paper_windmill", label: "Paper Windmill (Technical Event)" },
  {
    value: "machine_design_autocad",
    label: "Machine Design Autocad (Technical Event)",
  },
  {
    value: "electrical_component",
    label: "Electrical Component Identification & Modelling (Technical Event)",
  },
  { value: "painting", label: "Painting (Spot Event)" },
  { value: "photography", label: "Photography (Spot Event)" },
  { value: "treasure_hunt", label: "Treasure Hunt (Spot Event)" },
  { value: "rubik_cube", label: "Rubik's Cube (Spot Event)" },
  { value: "quiz", label: "Quiz (Literary Event)" },
  { value: "debate", label: "Debate (Literary Event)" },
  { value: "tekken", label: "Tekken 7 (Gaming)" },
  { value: "bgmi", label: "Bgmi (Gaming)" },
  { value: "mobile_legend", label: "Mobile Legend (Gaming)" },
  { value: "fc24", label: "FC24 (Gaming)" },
  { value: "light_vocal", label: "Light Vocal Solo (Voice of RESO)" },
  { value: "western_solo", label: "Western Solo Unplugged (Voice of RESO)" },
  { value: "classical&folk", label: "Classical & Folk (Dance Contest)" },
  { value: "modern", label: "Modern (Dance Contest)" },
  { value: "cosplay", label: "Cosplay Contest" },
  { value: "reel", label: "Reel Contest" },
];

const Register = () => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  // Mapping special components
  const specialComponents: Record<string, React.ElementType> = {
    bgmi: Bgmi,
    mobile_legend: MobileLegend,
  };

  // Determine the component to use
  const SelectedComponent =
    selectedOption?.value && specialComponents[selectedOption.value]
      ? specialComponents[selectedOption.value]
      : CommonForm;

  return (
    <div className="bg-black flex items-center justify-center ">
      <div className="pt-2 w-3/5 ">
        <h1 className="text-3xl text-white mb-3">Event to participate -</h1>
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
