import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertRegistration } from "@/shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateRegistration() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const validated = api.registrations.create.input.parse(data);
      const res = await fetch(api.registrations.create.path, {
        method: api.registrations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (res.status === 400) {
           const error = api.registrations.create.responses[400].parse(errorData);
           throw new Error(error.message);
        }
        throw new Error(errorData.message || "Failed to register");
      }

      return api.registrations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "You have been registered for E-Summit 2026.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
