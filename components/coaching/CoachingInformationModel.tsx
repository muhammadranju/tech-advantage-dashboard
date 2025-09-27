import { Calendar, Clock, User } from "lucide-react";

interface CoachingInformationModelProps {
  date: string;
  time: string;
  email: string;
  name: string;
  status: string;
  createdAt: string;
}
export default function CoachingInformationModel({
  date,
  time,
  email,
}: CoachingInformationModelProps) {
  return (
    <div className="">
      <div className="space-y-6">
        {/* Date */}
        <div className="flex items-center relative">
          <div className="flex-shrink-0 w-14 h-14 border-2 border-black rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 " />
          </div>
          <div className="ml-4">
            <p className="text-neutral-900 font-medium">
              {date || "18 Set, 2023"}
            </p>
          </div>
          {/* Dotted line */}
          <div className="absolute left-7 top-14 w-px h-6 border-l-2 border-dotted border-black"></div>
        </div>

        {/* Time */}
        <div className="flex items-center relative">
          <div className="flex-shrink-0 w-14 h-14 border-2 border-black rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-neutral-600" />
          </div>
          <div className="ml-4">
            <p className="text-neutral-900 font-medium">
              {time || "03:00 PM- 05:00 PM"}
            </p>
          </div>
          {/* Dotted line */}
          <div className="absolute left-7 top-14 w-px h-6 border-l-2 border-dotted border-black"></div>
        </div>

        {/* Email */}
        <div className="flex items-center">
          <div className="flex-shrink-0 w-14 h-14 border-2 border-black rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-neutral-600" />
          </div>
          <div className="ml-4">
            <p className="text-neutral-900 font-medium"> {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
