"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Save,
  Search,
  Trash2,
  User,
  X,
  Calendar,
} from "lucide-react";
import { useState } from "react";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  displayText: string;
}

interface BookingDetail {
  date: string;
  slot1?: string;
  slot2?: string;
  slot3?: string;
}

interface Coach {
  id: number;
  name: string;
  description: string;
  availableDates: Date[];
  timeSlots: TimeSlot[];
}

interface BookingData {
  name: string;
  description: string;
  details: BookingDetail[];
}

const CoachBooking = () => {
  const [coachName, setCoachName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDateTimeSlots, setSelectedDateTimeSlots] = useState<{
    [key: string]: TimeSlot[];
  }>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [editingTimeSlots, setEditingTimeSlots] = useState<boolean>(false);
  const [newTimeSlot, setNewTimeSlot] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: "",
    endTime: "",
  });

  // Default time slots
  const defaultTimeSlots: TimeSlot[] = [
    {
      id: "1",
      startTime: "10:00",
      endTime: "12:00",
      displayText: "10:00 AM - 12:00 PM",
    },
    {
      id: "2",
      startTime: "12:00",
      endTime: "14:00",
      displayText: "12:00 PM - 02:00 PM",
    },
    {
      id: "3",
      startTime: "15:00",
      endTime: "17:00",
      displayText: "03:00 PM - 05:00 PM",
    },
  ];

  // Sample coaches with future dates only
  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: 1,
      name: "Shawn",
      description: "Small Business Coach with 10+ years experience",
      availableDates: [],
      timeSlots: [...defaultTimeSlots],
    },
    {
      id: 2,
      name: "Emily",
      description: "Marketing Strategy Coach specializing in digital marketing",
      availableDates: [],
      timeSlots: [...defaultTimeSlots],
    },
    {
      id: 3,
      name: "Emily",
      description: "Marketing Strategy Coach specializing in digital marketing",
      availableDates: [],
      timeSlots: [...defaultTimeSlots],
    },
    {
      id: 4,
      name: "Emily",
      description: "Marketing Strategy Coach specializing in digital marketing",
      availableDates: [],
      timeSlots: [...defaultTimeSlots],
    },
    {
      id: 5,
      name: "Emily",
      description: "Marketing Strategy Coach specializing in digital marketing",
      availableDates: [],
      timeSlots: [...defaultTimeSlots],
    },
  ]);

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  // Get today's date for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter coaches based on search term
  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new coach
  const handleAddCoach = async () => {
    if (coachName.trim() && coachDescription.trim()) {
      const newCoach: Coach = {
        id: coaches.length + 1,
        name: coachName,
        description: coachDescription,
        availableDates: [],
        timeSlots: [...defaultTimeSlots],
      };

      try {
        setCoaches([...coaches, newCoach]);
        setCoachName("");
        setCoachDescription("");
        alert("Coach added successfully!");
      } catch (error) {
        console.error("Error adding coach:", error);
        alert("Failed to add coach");
      }
    }
  };

  // Select a coach (single selection)
  const handleCoachSelection = (coach: Coach) => {
    setSelectedCoach(coach);
    setSelectedDates([]);
    setSelectedDateTimeSlots({});
  };

  // Get calendar days for current month
  const getDaysInMonth = (date: Date): (Date | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Check if date is available for selected coach
  const isDateAvailable = (date: Date): boolean => {
    if (!selectedCoach) return false;
    if (date < today) return false;

    return selectedCoach.availableDates.some(
      (availableDate) => availableDate.getTime() === date.getTime()
    );
  };

  // Check if date is selected for booking
  const isDateSelected = (date: Date): boolean => {
    return selectedDates.some(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    );
  };

  // Add/remove date from coach's availability
  const toggleDateAvailability = async (date: Date) => {
    if (!selectedCoach || date < today) return;

    const updatedCoach = { ...selectedCoach };
    const dateIndex = updatedCoach.availableDates.findIndex(
      (d) => d.getTime() === date.getTime()
    );

    if (dateIndex > -1) {
      // Remove date
      updatedCoach.availableDates.splice(dateIndex, 1);
      // Also remove from selected dates if it was selected
      const selectedIndex = selectedDates.findIndex(
        (d) => d.getTime() === date.getTime()
      );
      if (selectedIndex > -1) {
        const newSelectedDates = [...selectedDates];
        newSelectedDates.splice(selectedIndex, 1);
        setSelectedDates(newSelectedDates);

        // Remove time slots for this date
        const dateKey = date.toISOString().split("T")[0];
        const newSelectedDateTimeSlots = { ...selectedDateTimeSlots };
        delete newSelectedDateTimeSlots[dateKey];
        setSelectedDateTimeSlots(newSelectedDateTimeSlots);
      }
    } else {
      // Add date
      updatedCoach.availableDates.push(date);
    }

    setCoaches(
      coaches.map((coach) =>
        coach.id === selectedCoach.id ? updatedCoach : coach
      )
    );
    setSelectedCoach(updatedCoach);
  };

  // Toggle date selection for booking
  const toggleDateSelection = (date: Date) => {
    if (!isDateAvailable(date)) return;

    const dateIndex = selectedDates.findIndex(
      (d) => d.getTime() === date.getTime()
    );
    const dateKey = date.toISOString().split("T")[0];

    if (dateIndex > -1) {
      // Remove date
      const newSelectedDates = [...selectedDates];
      newSelectedDates.splice(dateIndex, 1);
      setSelectedDates(newSelectedDates);

      // Remove time slots for this date
      const newSelectedDateTimeSlots = { ...selectedDateTimeSlots };
      delete newSelectedDateTimeSlots[dateKey];
      setSelectedDateTimeSlots(newSelectedDateTimeSlots);
    } else {
      // Add date
      setSelectedDates([...selectedDates, date]);
      setSelectedDateTimeSlots({ ...selectedDateTimeSlots, [dateKey]: [] });
    }
  };

  // Add time slot to selected date
  const addTimeSlotToDate = (dateKey: string, timeSlot: TimeSlot) => {
    const currentSlots = selectedDateTimeSlots[dateKey] || [];
    if (currentSlots.length >= 3) {
      alert("Maximum 3 time slots per date allowed");
      return;
    }

    if (currentSlots.some((slot) => slot.id === timeSlot.id)) {
      // Remove time slot
      setSelectedDateTimeSlots({
        ...selectedDateTimeSlots,
        [dateKey]: currentSlots.filter((slot) => slot.id !== timeSlot.id),
      });
      setEditingTimeSlots(false);
    } else {
      // Add time slot
      setSelectedDateTimeSlots({
        ...selectedDateTimeSlots,
        [dateKey]: [...currentSlots, timeSlot],
      });
      setEditingTimeSlots(false);
    }
  };

  // Add new time slot
  const handleAddTimeSlot = async () => {
    if (!selectedCoach || !newTimeSlot.startTime || !newTimeSlot.endTime)
      return;

    const formatTime = (time: string) => {
      const [hour, minute] = time.split(":");
      const h = parseInt(hour);
      const ampm = h >= 12 ? "PM" : "AM";
      const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${displayHour}:${minute} ${ampm}`;
    };

    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: newTimeSlot.startTime,
      endTime: newTimeSlot.endTime,
      displayText: `${formatTime(newTimeSlot.startTime)} - ${formatTime(
        newTimeSlot.endTime
      )}`,
    };

    const updatedCoach = {
      ...selectedCoach,
      timeSlots: [...selectedCoach.timeSlots, newSlot],
    };

    setCoaches(
      coaches.map((coach) =>
        coach.id === selectedCoach.id ? updatedCoach : coach
      )
    );
    setSelectedCoach(updatedCoach);
    setNewTimeSlot({ startTime: "", endTime: "" });
  };

  // Remove time slot
  const handleRemoveTimeSlot = async (timeSlotId: string) => {
    if (!selectedCoach) return;

    const updatedCoach = {
      ...selectedCoach,
      timeSlots: selectedCoach.timeSlots.filter(
        (slot) => slot.id !== timeSlotId
      ),
    };

    setCoaches(
      coaches.map((coach) =>
        coach.id === selectedCoach.id ? updatedCoach : coach
      )
    );
    setSelectedCoach(updatedCoach);

    // Remove this time slot from all selected dates
    const newSelectedDateTimeSlots = { ...selectedDateTimeSlots };
    Object.keys(newSelectedDateTimeSlots).forEach((dateKey) => {
      newSelectedDateTimeSlots[dateKey] = newSelectedDateTimeSlots[
        dateKey
      ].filter((slot) => slot.id !== timeSlotId);
    });
    setSelectedDateTimeSlots(newSelectedDateTimeSlots);
  };

  // Navigate months
  const navigateMonth = (direction: number): void => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  // Generate booking data in requested format
  const generateBookingData = (): BookingData => {
    const details: BookingDetail[] = [];

    selectedDates.forEach((date) => {
      const dateKey = date.toISOString().split("T")[0];
      const timeSlots = selectedDateTimeSlots[dateKey] || [];

      if (timeSlots.length > 0) {
        const detail: BookingDetail = { date: dateKey };

        timeSlots.forEach((slot, index) => {
          if (index === 0) detail.slot1 = slot.displayText;
          else if (index === 1) detail.slot2 = slot.displayText;
          else if (index === 2) detail.slot3 = slot.displayText;
        });

        details.push(detail);
      }
    });

    return {
      name: selectedCoach?.name || "",
      description: selectedCoach?.description || "",
      details: details,
    };
  };

  // Confirm booking
  const confirmBooking = async () => {
    if (!selectedCoach || selectedDates.length === 0) return;

    const bookingData = generateBookingData();

    if (bookingData.details.length === 0) {
      alert("Please select at least one time slot for your selected dates");
      return;
    }

    try {
      console.log("Booking Data:", JSON.stringify(bookingData, null, 2));
      alert(
        `Booking confirmed for ${selectedCoach.name}!\nCheck console for booking data.`
      );

      // Reset selections
      setSelectedDates([]);
      setSelectedDateTimeSlots({});
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking");
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="mx-auto px-">
      <div className="">
        <div className="flex gap-8 mb-5">
          <button
            onClick={() => window.history.back()}
            className="pb-2 cursor-pointer text-lg font-medium hover:border-b-2 border-black"
          >
            All Applications
          </button>
          <button className="pb-2 cursor-pointer text-lg font-medium border-b-2 border-black">
            Coach Management
          </button>
        </div>

        {/* Add New Coach */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <Label className="text-sm font-medium text-neutral-700 mb-2 block">
              Add New Coach
            </Label>
            <div className="flex gap-4">
              <Input
                placeholder="Enter coach name..."
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                className="flex-1 py-6"
              />
              <Input
                placeholder="Enter coach description..."
                value={coachDescription}
                onChange={(e) => setCoachDescription(e.target.value)}
                className="flex-1 py-6"
              />
              <Button
                onClick={handleAddCoach}
                className="bg-black hover:bg-neutral-800 py-6 text-white"
              >
                <Plus /> Add Coach
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coaches Section */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                Select Coach
              </h3>

              <div className="mb-4">
                <Label htmlFor="searchCoaches">Search Coaches</Label>
                <div className="relative">
                  <Input
                    id="searchCoaches"
                    placeholder="Search coaches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-6 my-3 peer ps-11"
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <Search size={28} aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className={`space-y-3 overflow-auto  max-h-[540px]`}>
                {filteredCoaches.map((coach) => (
                  <div
                    key={coach.id}
                    onClick={() => handleCoachSelection(coach)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all border-2
                      ${
                        selectedCoach?.id === coach.id
                          ? "bg-blue-50 border-neutral-500 shadow-sm"
                          : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-sm"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${
                              selectedCoach?.id === coach.id
                                ? "bg-neutral-800"
                                : "bg-neutral-200"
                            }
                          `}
                        >
                          {selectedCoach?.id === coach.id ? (
                            <Check className="h-5 w-5 text-white" />
                          ) : (
                            <User className="h-5 w-5 text-neutral-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-800">
                            {coach.name}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {coach.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calendar Section */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-neutral-800 mb-4 text-center">
                Manage Dates
              </h3>

              {!selectedCoach && (
                <div className="text-center py-8 text-neutral-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 text-neutral-400" />
                  <p>Please select a coach to manage dates</p>
                </div>
              )}

              {selectedCoach && (
                <>
                  {/* Month Navigation */}
                  <div className="flex items-center justify-center gap-x-8 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth(-1)}
                      className="p-2 rounded-full hover:bg-black hover:text-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h4 className="text-lg font-semibold">
                      {monthNames[currentMonth.getMonth()]}{" "}
                      {currentMonth.getFullYear()}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth(1)}
                      className="p-2 rounded-full hover:bg-black hover:text-white"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium text-neutral-500 py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      if (!day) {
                        return <div key={index} className="invisible"></div>;
                      }

                      const isAvailable = isDateAvailable(day);
                      const isSelected = isDateSelected(day);
                      const isPast = day < today;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (!isPast) {
                              // Right click or ctrl+click to manage availability, regular click to select for booking
                              toggleDateAvailability(day);
                            }
                          }}
                          onDoubleClick={() => {
                            if (isAvailable) {
                              toggleDateSelection(day);
                            }
                          }}
                          className={`
                            aspect-square flex items-center justify-center text-sm rounded-full
                            transition-all relative
                            ${
                              isPast
                                ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                                : ""
                            }
                            ${
                              !isPast && isAvailable && !isSelected
                                ? "bg-green-100 text-green-800 hover:bg-green-200 font-medium"
                                : ""
                            }
                            ${
                              isSelected
                                ? "bg-blue-500 text-white font-bold ring-2 ring-blue-300"
                                : ""
                            }
                            ${
                              !isPast && !isAvailable
                                ? "bg-neutral-50 text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                                : ""
                            }
                          `}
                          disabled={isPast}
                          title={
                            isAvailable
                              ? "Double-click to select for booking"
                              : "Click to add to availability"
                          }
                        >
                          {day.getDate()}
                          {isAvailable && !isSelected && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full"></div>
                          )}
                          {isSelected && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-200 rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 text-xs space-y-2">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                        <span className="text-neutral-600">Available</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-neutral-600">Selected</span>
                      </div>
                    </div>
                    <p className="text-center text-neutral-500">
                      Click: Add to availability | Double-click: Select for
                      booking
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Date-Time Selection */}
          <Card className="lg:col-span-1">
            <CardContent className="px-6 pt-6">
              <div className="flex items-center  justify-between mb-4">
                <h3 className="text-2xl font-bold text-neutral-800">
                  Time Slots
                </h3>
                {selectedCoach && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingTimeSlots(!editingTimeSlots)}
                    className="text-sm"
                  >
                    {editingTimeSlots ? <Save /> : <Edit />}
                    {editingTimeSlots ? "Done" : "Edit"}
                  </Button>
                )}
              </div>

              {!selectedCoach && (
                <div className="text-center py-8 text-neutral-500 ">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 text-neutral-400" />
                  <p>Please select a coach first</p>
                </div>
              )}

              {selectedCoach && (
                <>
                  {/* Add New Time Slot */}
                  {editingTimeSlots && (
                    <div className="mb-4 p-4 border-2 border-dashed border-neutral-200 rounded-lg">
                      <Label className="text-xm font-medium mb-2 block">
                        Add Time Slot
                      </Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          type="time"
                          value={newTimeSlot.startTime}
                          onChange={(e) =>
                            setNewTimeSlot({
                              ...newTimeSlot,
                              startTime: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                        <Input
                          type="time"
                          value={newTimeSlot.endTime}
                          onChange={(e) =>
                            setNewTimeSlot({
                              ...newTimeSlot,
                              endTime: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                      <Button
                        onClick={handleAddTimeSlot}
                        size="sm"
                        className="w-full"
                        disabled={
                          !newTimeSlot.startTime || !newTimeSlot.endTime
                        }
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Slot
                      </Button>
                    </div>
                  )}

                  {/* Time Slots List */}
                  <div className=" grid grid-cols-3 gap-1 items-center">
                    {selectedCoach.timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className=" text-xs  rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-2 border-neutral-200 transition-all p-2 text-center"
                      >
                        <span className="font-medium">{slot.displayText}</span>

                        {editingTimeSlots && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveTimeSlot(slot.id)}
                            className="ml-2 text-center text-xs hover:bg-red-100 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>

            <CardContent className="px-6">
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">
                Book Sessions
              </h3>

              {selectedDates.length === 0 && (
                <div className="text-center py-8 text-neutral-500">
                  <Calendar className="h-12 w-12 mx-auto mb-3 text-neutral-400" />
                  <p>Select dates to book sessions</p>
                </div>
              )}

              {selectedDates.length > 0 && (
                <div className="h-[540px] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {selectedDates.map((date) => {
                      const dateKey = date.toISOString().split("T")[0];
                      const selectedSlots =
                        selectedDateTimeSlots[dateKey] || [];

                      return (
                        <div
                          key={dateKey}
                          className="border rounded-lg p-4 flex-shrink-0"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-neutral-800">
                              {date.toLocaleDateString()}
                            </h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleDateSelection(date)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-3 gap-1 items-center">
                            {selectedCoach?.timeSlots.map((slot) => {
                              const isSelected = selectedSlots.some(
                                (s) => s.id === slot.id
                              );
                              const canSelect =
                                selectedSlots.length < 3 || isSelected;

                              return (
                                <button
                                  key={slot.id}
                                  onClick={() =>
                                    canSelect &&
                                    addTimeSlotToDate(dateKey, slot)
                                  }
                                  disabled={!canSelect}
                                  className={`
                                    w-full p-2 text-sm rounded transition-all
                                    ${
                                      isSelected
                                        ? "bg-green-500 text-white"
                                        : canSelect
                                        ? "bg-green-50 text-green-800 hover:bg-green-100 border border-green-200"
                                        : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                                    }
                                  `}
                                >
                                  {slot.displayText}
                                  {isSelected && (
                                    <Check className="inline h-4 w-4 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <p className="text-xs text-neutral-500 mt-2">
                            {selectedSlots.length}/3 slots selected
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Book Button */}
                  <div className="flex justify-center mt-4 pt-4 border-t flex-shrink-0">
                    <Button
                      onClick={confirmBooking}
                      className="py-6 text-white w-full"
                      disabled={Object.values(selectedDateTimeSlots).every(
                        (slots) => slots.length === 0
                      )}
                    >
                      <CalendarCheck />
                      Book Sessions (
                      {Object.values(selectedDateTimeSlots).flat().length}{" "}
                      slots)
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoachBooking;
