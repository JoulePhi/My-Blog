import React, {useEffect, useState} from 'react';
import Select from 'react-select';



const MultiSelectDropdown = ({options, title, setSelectedOption, indexes }) => {

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption.map(option => option.value));
    };




    return (
        <>
            <div className='flex flex-col'>
                <label htmlFor="flavor-select" className='text-sm mb-2'>{title}</label>
                <Select
                    id='flavor-select'
                    isMulti
                    onChange={handleChange}
                    options={options}
                    defaultValue={indexes}
                />
            </div>
        </>
    );
}

export default MultiSelectDropdown;
