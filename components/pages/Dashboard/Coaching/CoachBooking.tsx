"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddDateMutation,
  useCreateCoachMutation,
  useGetAllCoachesQuery,
  useGetSlotsByIdWithDateQuery,
} from "@/lib/redux/features/api/coaching/coachsApiSlice";
import {
  AlertCircle,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BackButtons from "../BootCamp/BackButtons";

type Coach = {
  _id: string;
  name: string;
  description: string;
  details: Array<{
    date: string;
    _id: string;
  }>;
};

type Slot = {
  value: string;
  flag: number;
  _id: string;
};

export default function CoachBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<Record<string, Slot[]>>(
    {}
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCoachName, setNewCoachName] = useState("");
  const [newCoachDesc, setNewCoachDesc] = useState("");

  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [bookingPreview, setBookingPreview] = useState<string | null>(null);

  const [openAddDateDialog, setOpenAddDateDialog] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newSlots, setNewSlots] = useState<string[]>(["", "", ""]);

  const { data: coachesData, isLoading, refetch } = useGetAllCoachesQuery({});
  const [createCoach] = useCreateCoachMutation();

  const [addDate] = useAddDateMutation();

  // FIXED + IMPROVED DateSlots - Only change needed!
  function DateSlots({
    coachId,
    dateKey,
    selected,
    onToggle,
    onRemove,
  }: {
    coachId: string;
    dateKey: string;
    selected: Slot[];
    onToggle: (slot: Slot) => void;
    onRemove: () => void;
  }) {
    const query = useGetSlotsByIdWithDateQuery(
      { coachId, date: dateKey },
      { skip: !coachId || !dateKey }
    );

    const slotData = query.data?.data;

    // Available slots (flag === 1)
    const availableSlots: Slot[] = [];
    if (slotData?.slot1?.flag === 1) availableSlots.push(slotData.slot1);
    if (slotData?.slot2?.flag === 1) availableSlots.push(slotData.slot2);
    if (slotData?.slot3?.flag === 1) availableSlots.push(slotData.slot3);

    // Booked slots (flag === 0)
    const bookedSlots: Slot[] = [];
    if (slotData?.slot1?.flag === 0) bookedSlots.push(slotData.slot1);
    if (slotData?.slot2?.flag === 0) bookedSlots.push(slotData.slot2);
    if (slotData?.slot3?.flag === 0) bookedSlots.push(slotData.slot3);

    return (
      <div className="border rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold">
            {parseDateKey(dateKey).toLocaleDateString()}
          </h4>
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {query.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading slots...</p>
        ) : availableSlots.length === 0 && bookedSlots.length === 0 ? (
          <p className="text-sm text-orange-600">No slots on this date</p>
        ) : (
          <div className="space-y-2">
            {/* Available Slots */}
            {availableSlots.map((slot) => {
              const isSelected = selected.some((s) => s._id === slot._id);
              return (
                <button
                  key={slot._id}
                  onClick={() => onToggle(slot)}
                  className={`w-full p-3 rounded text-left transition-all flex justify-between items-center ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "bg-neutral-100 hover:bg-neutral-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {slot.value}
                  </span>
                  {isSelected && <Check className="h-5 w-5" />}
                </button>
              );
            })}

            {/* Booked Slots - Shown in gray */}
            {bookedSlots.map((slot) => (
              <div
                key={slot._id}
                className="w-full p-3 rounded bg-gray-100 text-gray-500 flex justify-between items-center opacity-70"
              >
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {slot.value}
                </span>
                <span className="text-xs font-medium">Booked</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const coaches: Coach[] = coachesData?.data || [];

  const filteredCoaches = coaches.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCoach = async () => {
    if (!newCoachName.trim() || !newCoachDesc.trim()) return;
    try {
      await createCoach({
        body: { name: newCoachName, description: newCoachDesc },
      }).unwrap();
      toast.success("Coach added!");
      setNewCoachName("");
      setNewCoachDesc("");
      setOpenAddDialog(false);
      refetch();
    } catch {
      toast.error("Failed to add coach");
    }
  };

  const handleAddNewDate = async () => {
    if (!newDate) {
      toast.error("Please select a date");
      return;
    }
    try {
      const [y, m, d] = newDate.split("-");
      const formattedDate = `${d}-${m}-${y}`;
      await addDate({
        coachId: selectedCoach!._id,
        date: formattedDate,
      }).unwrap();
      toast.success("New date & slots added successfully!");
      setOpenAddDateDialog(false);
      setNewDate("");
      setNewSlots(["", "", ""]);
      refetch();
    } catch (err) {
      toast.error("Failed to add date. Check console.");
      console.error(err);
    }
  };

  const monthNames = [
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++)
      days.push(new Date(year, month, d));
    return days;
  };

  const formatDateKey = (date: Date) => {
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const parseDateKey = (key: string): Date => {
    const [d, m, y] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedCoach) return false;
    const key = formatDateKey(date);
    return selectedCoach.details.some((d) => d.date === key);
  };

  const toggleDate = (date: Date) => {
    const key = formatDateKey(date);
    if (!isDateAvailable(date)) return;

    if (selectedDates.includes(key)) {
      setSelectedDates(selectedDates.filter((d) => d !== key));
      setSelectedSlots((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    } else {
      setSelectedDates([...selectedDates, key]);
    }
  };

  const toggleSlotSelection = (dateKey: string, slot: Slot) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey]?.some((s) => s._id === slot._id)
        ? prev[dateKey].filter((s) => s._id !== slot._id)
        : [...(prev[dateKey] || []), slot],
    }));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="px-10 mt-5 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <BackButtons backTitle="Applications" title="Coach Booking" />
        <Button
          onClick={() => setOpenAddDialog(true)}
          className="bg-black hover:bg-neutral-800 py-6 text-white"
        >
          <Plus className="mr-2" /> Add Coach
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Coaches List - Your Original Design */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-4">Select Coach</h3>
            <div className="relative mb-4">
              <Input
                placeholder="Search coaches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-6 ps-11"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={28}
              />
            </div>
            <div className="space-y-3 max-h-[620px] overflow-y-auto">
              {isLoading ? (
                <p className="text-center py-8 text-muted-foreground mx-auto">
                  Loading...
                </p>
              ) : (
                filteredCoaches.map((coach) => (
                  <div
                    key={coach._id}
                    onClick={() => {
                      setSelectedCoach(coach);
                      setSelectedDates([]);
                      setSelectedSlots({});
                    }}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCoach?._id === coach._id
                        ? "border-black bg-blue-50"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          selectedCoach?._id === coach._id
                            ? "bg-black"
                            : "bg-neutral-200"
                        }`}
                      >
                        {selectedCoach?._id === coach._id ? (
                          <Check className="text-white" />
                        ) : (
                          <User className="text-neutral-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{coach.name}</h4>
                        <p className="text-sm text-neutral-600">
                          {coach.description}
                        </p>
                        {coach.details.length > 0 && (
                          <p className="text-xs text-green-600 mt-1">
                            {coach.details.length} available dates
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* 2. Calendar - Your Original Design */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Available Dates</h3>
              {selectedCoach && (
                <Button
                  onClick={() => setOpenAddDateDialog(true)}
                  size="sm"
                  className="bg-black hover:bg-neutral-800 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Date & Slots
                </Button>
              )}
            </div>

            {!selectedCoach ? (
              <div className="text-center py-16 text-muted-foreground">
                <AlertCircle className="mx-auto mb-3 h-12 w-12" />
                <p>Select a coach first</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-8 mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1
                        )
                      )
                    }
                  >
                    <ChevronLeft />
                  </Button>
                  <h4 className="text-lg font-medium">
                    {monthNames[currentMonth.getMonth()]}{" "}
                    {currentMonth.getFullYear()}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1
                        )
                      )
                    }
                  >
                    <ChevronRight />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (d) => (
                      <div key={d}>{d}</div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, i) => {
                    if (!day) return <div key={i} />;
                    const key = formatDateKey(day);
                    const available = isDateAvailable(day);
                    const selected = selectedDates.includes(key);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const past = day < today;

                    return (
                      <button
                        key={i}
                        onClick={() => !past && toggleDate(day)}
                        disabled={!available || past}
                        className={`aspect-square rounded-full text-sm flex-center transition-all ${
                          past
                            ? "text-neutral-300"
                            : selected
                            ? "bg-blue-600 text-white"
                            : available
                            ? "bg-green-100 hover:bg-green-200"
                            : "bg-neutral-50"
                        }`}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* 3. Time Slots & Booking - Your Original Design */}
        <Card>
          <CardContent className="p-6 h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-4">Select Time Slots</h3>

            {selectedDates.length === 0 ? (
              <div className="flex-1 flex-center text-center text-muted-foreground">
                <Calendar className="mx-auto mb-3 h-12 w-12" />
                <p>Pick available dates to see time slots</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {selectedDates.map((dateKey) => (
                    <DateSlots
                      key={dateKey}
                      coachId={selectedCoach?._id || ""}
                      dateKey={dateKey}
                      selected={selectedSlots[dateKey] || []}
                      onToggle={(slot) => toggleSlotSelection(dateKey, slot)}
                      onRemove={() => toggleDate(parseDateKey(dateKey))}
                    />
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Your Original Dialogs - Unchanged */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Coach</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Name</Label>
              <Input
                value={newCoachName}
                onChange={(e) => setNewCoachName(e.target.value)}
                placeholder="Coach name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={newCoachDesc}
                onChange={(e) => setNewCoachDesc(e.target.value)}
                placeholder="e.g. Spanish Coach"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddCoach}>Add Coach</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openAddDateDialog} onOpenChange={setOpenAddDateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Available Date & Slots</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-4">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={newDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <Label>Time Slot {i + 1} (optional)</Label>
                <Input
                  placeholder="e.g. 9am-10am"
                  value={newSlots[i]}
                  onChange={(e) => {
                    const temp = [...newSlots];
                    temp[i] = e.target.value;
                    setNewSlots(temp);
                  }}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setOpenAddDateDialog(false);
                setNewDate("");
                setNewSlots(["", "", ""]);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNewDate}>Save Date & Slots</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openPreviewDialog} onOpenChange={setOpenPreviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking JSON</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <pre className="bg-neutral-100 p-3 rounded max-h-[300px] overflow-auto text-sm">
              {bookingPreview}
            </pre>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                if (bookingPreview) {
                  navigator.clipboard.writeText(bookingPreview);
                  toast.success("JSON copied");
                }
              }}
            >
              Copy JSON
            </Button>
            <Button onClick={() => setOpenPreviewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
