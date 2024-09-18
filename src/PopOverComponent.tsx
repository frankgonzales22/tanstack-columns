import * as React from "react";
import {
    ChakraProvider,
    Box,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody,
    Checkbox,
    Stack,
    PopoverArrow,
    PopoverFooter,
    useDisclosure,
    Input,
    ButtonGroup,
} from "@chakra-ui/react";

interface PopoverProp {
    options: string[];
    checkedArray: (checked: string[]) => void;
    title: string;
}

function PopoverComponent({ title, options, checkedArray }: PopoverProp) {
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
    const [filteredOptions, setFilteredOptions] = React.useState<string[]>([]);
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const [allSelected, setAllSelected] = React.useState<boolean>(false);

    React.useEffect(() => {
        const sortedOptions = [...options].sort((a, b) => {
            if (typeof a === "string" && typeof b === "string") {
                return a.localeCompare(b);
            } else if (typeof a === "number" && typeof b === "number") {
                return a - b;
            } else {
                return 0;
            }
        });

        const newFilteredOptions = sortedOptions.filter((option) => {
            const optionString = typeof option === "string" ? option.toLowerCase() : String(option);
            return optionString.includes(searchTerm.toLowerCase());
        });

        setFilteredOptions(newFilteredOptions);

        // Check if all filtered options are selected
        setAllSelected(newFilteredOptions.every(option => selectedOptions.includes(option)));
    }, [options, searchTerm, selectedOptions]);

    const handleCheckboxChange = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((item) => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleSelectAllToggle = () => {
        if (allSelected) {
            // Unselect all
            setSelectedOptions(selectedOptions.filter(option => !filteredOptions.includes(option)));
        } else {
            // Select all
            setSelectedOptions([...selectedOptions, ...filteredOptions.filter(option => !selectedOptions.includes(option))]);
        }
    };

    const handleClearSelection = () => {
        setSelectedOptions([]);
        setAllSelected(false);
    };

    return (
        <Popover onClose={onClose} isOpen={isOpen} placement="bottom-start">
            <PopoverTrigger>
                <Button
                    colorScheme="teal"
                    mb={"1"}
                    fontWeight={"normal"}
                    marginLeft={"5px"}
                    onClick={onToggle}
                >
                    {title}
                </Button>
            </PopoverTrigger>
            <PopoverContent w={"300px"} padding={"10px 10px"}>
                <PopoverArrow />
                <PopoverHeader>Filter Item by {title}</PopoverHeader>
                <PopoverBody>
                    <Input
                        placeholder="Search..."
                        mb={2}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div
                        style={{
                            maxHeight: "320px",
                            minHeight: "40px",
                            overflow: "auto",
                            display: "grid",
                        }}
                    >
                        {filteredOptions.map((option, index) => (
                            <Checkbox
                                style={{ paddingLeft: "20px" }}
                                key={index}
                                isChecked={selectedOptions.includes(option)}
                                onChange={() => handleCheckboxChange(option)}
                            >
                                {option}
                            </Checkbox>
                        ))}
                    </div>
                </PopoverBody>
                <PopoverFooter display="flex" alignItems="center" justifyContent="space-between" padding="10px">
                    <ButtonGroup spacing={4}>
                        <Button onClick={handleSelectAllToggle} colorScheme="teal">
                            {allSelected ? "Unselect All" : "Select All"}
                        </Button>
                        {/* Uncomment if you want the Clear button */}
                        {/* <Button onClick={handleClearSelection}>Clear</Button> */}
                    </ButtonGroup>
                    
                    <Button
                        as={PopoverCloseButton}
                        width="100px"
                        onClick={() => {
                            checkedArray(selectedOptions);
                            onClose();
                        }}
                        colorScheme="blue"
                        style={{
                           marginTop : '-8px'
                        }}
                        // padding="0 10px" // Adjust padding as needed
                    >
                        Apply
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}

export default PopoverComponent;
