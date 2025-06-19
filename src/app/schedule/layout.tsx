export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-y-auto p-4 justify-center mx-auto md:flex-row flex-col flex gap-4 items-center">
      <div className="flex-col max-w-[600px] flex items-start justify-center gap-4 w-full">
       <div className="space-y-4 w-full overflow-y-auto">
        <h1>Select Date</h1>
         {children}
       </div>

        <div className="min-w-[300px] flex flex-col gap-4 border w-full pb-4 rounded-lg">
          <h1 className="border-b p-4">Appointment Details</h1>

          {/* personal information */}
          <div className="px-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="text-gray-500">Personal_Information</p>
              <span className="bg-gray-200 h-[1px] flex-1"></span>
            </div>

            {/* fullname */}
            <div className="flex items-center justify-between gap-2">
              <label className="label">Fullname</label>
              <p>John Doe</p>
            </div>
            {/* phone number */}
            <div className="flex items-center justify-between gap-2">
              <label className="label">Contact</label>
              <p>0923523848</p>
            </div>
          </div>

          {/* car information */}
          <div className="px-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="text-gray-500">Car_Information</p>
              <span className="bg-gray-200 h-[1px] flex-1"></span>
            </div>

            {/* car name */}
            <div className="flex items-center justify-between gap-2">
              <label className="label">Car Name</label>
              <p>Toyota</p>
            </div>
            {/* plate number */}
            <div className="flex items-center justify-between gap-2">
              <label className="label">Plate Number</label>
              <p>ABC123</p>
            </div>
          </div>

          {/* service information */}
          <div className="px-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <p className="text-gray-500">Service_Information</p>
              <span className="bg-gray-200 h-[1px] flex-1"></span>
            </div>

            {/* service */}
            <div className="flex items-center justify-between gap-2">
              <label className="label">Service</label>
              <p>Oil Change</p>
            </div>
            {/* date and time */}
            <div className="flex items-center justify-between gap-2">
              <label className="label">Date</label>
              <p>09-09-2023 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
