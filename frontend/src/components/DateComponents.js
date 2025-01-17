import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './date.css';
import { StoreContext } from "../services/contextapi_state_management/store";
import { add_corporate_cart } from "../services/contextapi_state_management/action/action";
import axios from "axios";

function DateComponent({ foodtype, quantity }) {
    const [selectedDates, setSelectedDates] = useState([]);
    const [monthlyIncludedDays, setMonthlyIncludedDays] = useState({});
    const [individualToggles, setIndividualToggles] = useState({});
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [lastClickedDate, setLastClickedDate] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const { state, dispatch } = useContext(StoreContext);
const [toDate, setToDate] = useState(null);


    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();

    useEffect(() => {
        updateSelectedDates();
        updateMonthlyIncludedDays();
    }, [individualToggles, dragStart, dragEnd]);


    const updateSelectedDates = () => {
        const allSelectedDates = Object.entries(individualToggles)
            .filter(([dateStr, isSelected]) => isSelected && new Date(dateStr) >= currentDate)
            .map(([dateStr]) => new Date(dateStr));
    
        if (dragStart && dragEnd) {
            const dragRange = generateDateRange(dragStart, dragEnd);
            dragRange.forEach(date => {
                if (date >= currentDate && !allSelectedDates.some(d => d.toDateString() === date.toDateString())) {
                    allSelectedDates.push(date);
                }
            });
        }
    
        allSelectedDates.sort((a, b) => a - b); // Sort dates
    
        if (allSelectedDates.length > 0) {
            setFromDate(allSelectedDates[0]);
            setToDate(allSelectedDates[allSelectedDates.length - 1]);
        }
    
        setSelectedDates(allSelectedDates);
    };
    

    const updateMonthlyIncludedDays = () => {
        const newMonthlyIncludedDays = {};
        Object.entries(individualToggles).forEach(([dateStr, isSelected]) => {
            if (isSelected) {
                const date = new Date(dateStr);
                const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
                const dayOfWeek = date.getDay();
                if (!newMonthlyIncludedDays[monthKey]) {
                    newMonthlyIncludedDays[monthKey] = {};
                }
                newMonthlyIncludedDays[monthKey][dayOfWeek] = true;
            }
        });
        setMonthlyIncludedDays(newMonthlyIncludedDays);
    };

    const handleDateClick = (date) => {
        if (date < currentDate) return;
        const dateStr = date.toDateString();

        if (lastClickedDate && !individualToggles[dateStr]) {
            const dateRange = generateDateRange(lastClickedDate, date);
            const newToggles = { ...individualToggles };

            dateRange.forEach(d => {
                if (d >= currentDate) {
                    const dStr = d.toDateString();
                    newToggles[dStr] = true;
                }
            });

            setIndividualToggles(newToggles);
            setLastClickedDate(null);
        } else {
            setIndividualToggles(prev => ({
                ...prev,
                [dateStr]: !prev[dateStr]
            }));

            setLastClickedDate(individualToggles[dateStr] ? null : date);
        }

        if (date.getMonth() !== currentMonth.getMonth() || date.getFullYear() !== currentMonth.getFullYear()) {
            setCurrentMonth(date);
        }
    };



    const handleDragStart = (date) => {
        if (date < currentDate) return;
        setDragStart(date);
        setDragEnd(null);
        setIsDragging(true);
    };

    const handleDragEnter = (date) => {
        if (isDragging && date >= currentDate) {
            setDragEnd(date);
        }
    };

    const handleDragEnd = () => {
        if (dragStart && dragEnd) {
            const dragRange = generateDateRange(dragStart, dragEnd);
            const newToggles = { ...individualToggles };
            const newMonthlyIncludedDays = { ...monthlyIncludedDays };

            dragRange.forEach(date => {
                if (date >= currentDate) {
                    const dateStr = date.toDateString();
                    newToggles[dateStr] = true;

                    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
                    const dayOfWeek = date.getDay();
                    if (!newMonthlyIncludedDays[monthKey]) {
                        newMonthlyIncludedDays[monthKey] = {};
                    }
                    newMonthlyIncludedDays[monthKey][dayOfWeek] = true;
                }
            });

            setIndividualToggles(newToggles);
            setMonthlyIncludedDays(newMonthlyIncludedDays);
        }
        setDragStart(null);
        setDragEnd(null);
        setIsDragging(false);
    };

    const generateDateRange = (start, end) => {
        let dates = [];
        let currentDate = new Date(Math.min(start, end));
        const endDate = new Date(Math.max(start, end));
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const dayClassName = (date) => {
        if (date < currentDate) return "disabled-day";

        const dateStr = date.toDateString();
        return individualToggles[dateStr] ? "selected-day" : "default-day";
    };


    const handleIncludeDayChange = (day) => {
        const monthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
        const newValue = !monthlyIncludedDays[monthKey]?.[day];

        setIndividualToggles(prev => {
            const newToggles = { ...prev };
            const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
            const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

            for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
                if (d.getDay() === day && d >= currentDate) {
                    const dateStr = d.toDateString();
                    newToggles[dateStr] = newValue;
                }
            }
            return newToggles;
        });
    };

    const handleSaveDates = async () => {
        const dates = selectedDates;
    
        if (quantity === 0) {
            console.log('Oops! You did not mention the quantity.');
        } else if (dates.length === 0) {
            console.log('Oops! You did not mention the dates.');
        } else {
            // for (let i = 0; i < dates.length; i++) {
            //     // Format the date to 'YYYY-MM-DD'
            //     const formattedDate = new Date(dates[i]).toISOString().split('T')[0]; 
                
            //     try {
            //         const response = await axios.post('http://localhost:7000/customer/cart/corporate', {
            //             category_id: foodtype.category_id,
            //             processing_date: formattedDate,  // Sending formatted date
            //             quantity:quantity,
            //         },{
            //             headers: { token: `${localStorage.getItem('accessToken')}` }
            //         });
            //         console.log(`Data for ${formattedDate} saved successfully!`, response.data);
            //     } catch (error) {
            //         console.error(`Error saving data for ${formattedDate}`, error);
            //     }
            // }
        //    const response =await axios.post('http://localhost:7000/customer/cart/corporate',{
        //     category_details:{
        //         "type":foodtype.
        //     }
        //    })
        console.log('in dt',{ foodtype , dates , quantity })
        for (let i = 0; i < dates.length; i++) {
            const data={
                
            }
        }
        }
    };
    


    const handleclear = () => {
        setSelectedDates([]);
        setIndividualToggles({});
        setDragStart(null);
        setDragEnd(null);
        setIsDragging(false);
        setMonthlyIncludedDays({});
        setFromDate(null);
        setToDate(null);
    };

    const renderCustomHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div style={{ margin: '5px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '5px' }}>
                <button
                    className="bold-arrow-left "
                    onClick={() => {
                        decreaseMonth();
                        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1, 1));
                    }}
                    disabled={prevMonthButtonDisabled}
                >
                    {"<"}
                </button>
                <div className="bold-text2">{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                <button
                    className="bold-arrow-right"
                    onClick={() => {
                        increaseMonth();
                        setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
                    }}
                    disabled={nextMonthButtonDisabled}
                >
                    {">"}
                </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', fontSize: '0.8em' }}>
                {weekdays.map((day, index) => (
                    <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            id={`include-${day}`}
                            checked={monthlyIncludedDays[`${date.getFullYear()}-${date.getMonth()}`]?.[index] || false}
                            onChange={() => handleIncludeDayChange(index)}
                            style={{ margin: '0 0 2px 0', width: '12px', height: '12px', margin: '7px' }}
                        />
                        <label
                            htmlFor={`include-${day}`}
                            className={`bold-label ${index === 0 || index === 6 ? 'weekend' : ''}`}
                        >
                            {day}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    // Touch event handlers
    const handleTouchStart = (date) => {
        handleDragStart(date);
    };

    const handleTouchMove = (e, date) => {
        e.preventDefault(); // Prevent scrolling while dragging
        handleDragEnter(date);
    };

    const handleTouchEnd = () => {
        handleDragEnd();
    };

    return (
        <div className="container">
            <div className="calendar-container">
                <div className="date-range-display">
            <p className="date-range">From: {fromDate ? dayjs(fromDate).format('DD/MM/YYYY') : 'dd/mm/yyyy'}</p>
            <p className="date-range">To: {toDate ? dayjs(toDate).format('DD/MM/YYYY') : 'dd/mm/yyyy'}</p>
            </div>
                <DatePicker
                    selected={null}
                    onChange={() => { }}
                    onSelect={handleDateClick}
                    onMonthChange={(date) => setCurrentMonth(date)}
                    inline
                    dayClassName={dayClassName}
                    dateFormat="dd/MM/yyyy"
                    renderCustomHeader={renderCustomHeader}
                    renderDayContents={(day, date) => (
                        <div className="datepicker bold-text"
                            onMouseDown={() => handleDragStart(date)}
                            onMouseEnter={() => handleDragEnter(date)}
                            onMouseUp={handleDragEnd}
                            onTouchStart={() => handleTouchStart(date)}
                            onTouchMove={(e) => handleTouchMove(e, date)}
                            onTouchEnd={handleTouchEnd}
                        >
                            {day}
                        </div>
                    )}
                    minDate={currentDate}
                />
                <div className="selected-container">
                    <div>
                        <p className="days">Chosen Dining Days: {selectedDates.length}</p>
                    </div>
                    <div >
                        <button className="btn text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-800" onClick={handleclear}>Clear</button>
                    </div>
                    <div>
                        <button className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleSaveDates}>Save</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default DateComponent;
