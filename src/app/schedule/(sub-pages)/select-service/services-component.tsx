import { Settings, Wrench } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SelectedService } from "./selected-service-type";
import { Services } from "./services-type";
import { createClient } from "@/lib/supabase/client";

export default function ServicesComponent({
  selectedServiceType,
  handleSelectService,
  selectedService,
}: {
  selectedServiceType: "Repair" | "Maintenance";
  handleSelectService: (serviceName: string, serviceFee: number) => void;
  selectedService: SelectedService;
}) {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('services')
          .select('*');

        if (error) {
          throw error;
        }

        if (data) {
          
          const formattedServices = data.map(service => ({
            name: service?.service_name,
            category: service.service_type,
            icon: service.service_type === "Repair" ? Wrench : Settings,
            description: service.description,
            serviceFee: service.service_fee
          }));
          setServices(formattedServices);
      
        }  
            
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [supabase]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl">Services</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="border p-4 rounded-md flex items-center gap-4">
              <div className="bg-gray-100 p-4 rounded-full animate-pulse">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2 w-full">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl">Services</h1>
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Error loading services: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Services</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {services
          .filter((s) => s.category === selectedServiceType)
          .map((service, serviceIndex) => (
            <div
              onClick={() =>
                handleSelectService(service.name, service.serviceFee)
              }
              key={serviceIndex}
              className={`${
                service.name === selectedService.name && "ring-2 ring-primary"
              }  transition-all hover:scale-102 duration-300 ease-in-out border p-4 rounded-md flex items-center gap-4 cursor-pointer `}
            >
              <div className="bg-gray-100 p-4 rounded-full">
                <service.icon size={25} />
              </div>

              <div className="space-y-1">
                <p className="font-bold text-lg">{service.name}</p>
                <p className="font-semibold">
                  ₱{service.serviceFee?.toLocaleString()}
                </p>

                <p className="leading-[22px] max-w-[300px] text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}