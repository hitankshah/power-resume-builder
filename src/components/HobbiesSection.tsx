
import React from "react";
import { useFieldArray } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const HobbiesSection = ({ form }: any) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hobbies",
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg relative animate-enter">
            <div className="absolute top-4 right-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`hobbies.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hobby / Interest</FormLabel>
                    <FormControl>
                      <Input placeholder="Photography, Reading, Running, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`hobbies.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of your hobby or how it relates to your professional skills..."
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            id: uuidv4(),
            name: "",
            description: "",
          })
        }
        className="w-full"
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Hobby / Interest
      </Button>
    </div>
  );
};

export default HobbiesSection;
