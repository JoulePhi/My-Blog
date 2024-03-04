import React, { useState } from 'react';
import Select from 'react-select';



const MultiSelectDropdown = ({options, title}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };



    return (
        <>
            <div className='flex flex-col'>
                <label htmlFor="flavor-select" className='text-sm mb-2'>{title}</label>
                <Select
                    id='flavor-select'
                    isMulti
                    value={selectedOption}
                    onChange={handleChange}
                    options={options}
                />
            </div>
        </>
    );
}

export default MultiSelectDropdown;
