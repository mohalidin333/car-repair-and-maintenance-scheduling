import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Plus, Settings, X } from "lucide-react";
import React from "react";

export default function SchedulingSettingsComponent({
  handleToggle,
  isOpen,
  times,
  handleChangeTime,
  handleAddTime,
  handleRemoveTime,
  restdays,
  handleChangeRestDay,
  handleAddRestDay,
  handleRemoveRestDay,
  holidays,
  handleChangeHoliday,
  handleAddHoliday,
  handleRemoveHoliday,
  handleSave,
  isItemExist,
  currentYear,
}: {
  handleToggle: () => void;
  isOpen: boolean;
  times: { hour: string; minute: string; meridiem: string }[];
  handleChangeTime: (index: number, field: string, value: string) => void;
  handleAddTime: () => void;
  handleRemoveTime: (index: number) => void;
  restdays: string[];
  handleChangeRestDay: (index: number, value: string) => void;
  handleAddRestDay: () => void;
  handleRemoveRestDay: (index: number) => void;
  holidays: { month: number; date: number }[];
  handleChangeHoliday: (index: number, value: string) => void;
  handleAddHoliday: () => void;
  handleRemoveHoliday: (index: number) => void;
  handleSave: () => void;
  isItemExist: (itemLength: number, index: number) => boolean;
  currentYear: number;
}) {
  return (
    <div className="space-y-4 px-4 py-8 max-w-screen-lg mx-auto">
      {/* scheduling settings */}
      <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
        <p className="text-xl font-bold flex items-center gap-2">
          <Settings size={20} />
          Scheduling Settings
        </p>

        <div
          onClick={handleToggle}
          className="flex items-center border rounded-full cursor-pointer border-gray-300 p-1"
        >
          <div className={`${!isOpen && "bg-gray-500"} p-2 rounded-full`}></div>
          <div className={`${isOpen && "bg-primary"} p-2 rounded-full`}></div>
        </div>
      </div>

      {/* scheduling configuration */}
      {isOpen && (
        <div className="flex-col gap-8 bg-white rounded-lg border p-4 flex items-center justify-between">
          {/* available times */}
          <div className="w-full space-y-4">
            <p className="font-semibold">Available Times</p>

            {times.map((time, index) => (
              <div key={index} className="flex items-end gap-4 w-full">
                {/* hour */}
                <div className="flex flex-col gap-2 w-full">
                  <label>Hour</label>
                  <Input
                    type="text"
                    value={time.hour}
                    onChange={(e) =>
                      handleChangeTime(index, "hour", e.target.value)
                    }
                  />
                </div>

                {/* minute */}
                <div className="flex flex-col gap-2 w-full">
                  <label>Minute</label>
                  <Input
                    type="text"
                    value={time.minute}
                    onChange={(e) =>
                      handleChangeTime(index, "minute", e.target.value)
                    }
                  />
                </div>

                {/* meridiem  */}
                <div className="flex flex-col gap-2 w-full">
                  <label>Meridiem</label>
                  <Select
                    value={time.meridiem}
                    onValueChange={(value) =>
                      handleChangeTime(index, "meridiem", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Meridiem">
                        {time.meridiem}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isItemExist(times.length, index) ? (
                  <Button onClick={handleAddTime}>
                    <Plus size={15} />
                  </Button>
                ) : (
                  <Button
                    variant={"destructive"}
                    onClick={() => handleRemoveTime(index)}
                  >
                    <X size={15} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* restday */}
          <div className="w-full space-y-4">
            <p className="font-semibold">Restday</p>

            {restdays.map((day, index) => (
              <div key={index} className="flex items-end gap-4">
                {/* weeks  */}
                <div className="flex flex-col gap-2 w-full">
                  <label>Day</label>
                  <Select
                    value={day}
                    onValueChange={(val) => handleChangeRestDay(index, val)}
                  >
                    <SelectTrigger className="w-full">{day}</SelectTrigger>
                    <SelectContent>
                      {[
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                      ].map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {isItemExist(restdays.length, index) ? (
                  <Button onClick={handleAddRestDay}>
                    <Plus size={15} />
                  </Button>
                ) : (
                  <Button
                    variant={"destructive"}
                    onClick={() => handleRemoveRestDay(index)}
                  >
                    <X size={15} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* holiday */}
          <div className="w-full space-y-4">
            <p className="font-semibold">Holiday</p>

            {holidays.map((holiday, index) => (
              <div key={index} className="flex items-end gap-4 w-full">
                {/* date  */}
                <div className="flex flex-col gap-2 w-full">
                  <label>Date</label>

                  <Input
                    type="date"
                    onChange={(e) => handleChangeHoliday(index, e.target.value)}
                    className="block"
                    value={Intl.DateTimeFormat("en-CA").format(
                      new Date(currentYear, holiday.month, holiday.date)
                    )}
                  />
                </div>

                {isItemExist(holidays.length, index) ? (
                  <Button onClick={handleAddHoliday}>
                    <Plus size={15} />
                  </Button>
                ) : (
                  <Button
                    variant={"destructive"}
                    onClick={() => handleRemoveHoliday(index)}
                  >
                    <X size={15} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* save */}
          <div className="flex gap-2 items-center justify-start w-full">
            <Button onClick={handleSave} type="submit">
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
