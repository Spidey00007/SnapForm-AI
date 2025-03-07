import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";

function FormUi({
  jsonForm,
  selectedTheme,
  selectedStyle,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId = 0,
  enabledSignIn = false,
}) {
  const [formData, setFormData] = useState({});
  const formRef = useRef(null);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    console.log("Form loaded from google", jsonForm);
  }, [jsonForm]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (fieldName, itemName, value) => {
    const list = formData?.[fieldName] ? formData?.[fieldName] : [];

    if (value) {
      list.push({
        label: itemName,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldName]: list,
      });
    } else {
      const result = list.filter((item) => item.label !== itemName);
      setFormData({
        ...formData,
        [fieldName]: result,
      });
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    try {
      const result = await db.insert(userResponses).values({
        jsonResponse: formData,
        createdAt: moment().format("DD/MM/YYYY"),
        formRef: formId,
      });

      if (result) {
        formRef.current.reset();
        toast("Response Submitted Successfully!");
      } else {
        toast("Error while saving your form!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("Error while saving your form!");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className="border p-5 md:w-full rounded-lg"
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key == "boxshadow" && "5px 5px 0px black",
        border: selectedStyle?.key == "border" && selectedStyle.value,
      }}
    >
      <h2 className="font-bold text-center text-2xl">
        {jsonForm[0]?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm[0]?.formHeading}
      </h2>

      {jsonForm[0]?.fields?.map((field, index) => (
        <div key={index} className="my-6">
          {field?.label && (
            <label className="text-sm text-gray-500 block mb-1">
              {field.label}
            </label>
          )}

          {field?.fieldType === "select" ? (
            <Select
              required={field?.required}
              onValueChange={(v) => handleSelectChange(field.fieldName, v)}
            >
              <SelectTrigger className="w-full bg-transparent mt-1">
                <SelectValue
                  placeholder={field?.placeholder || "Select an option"}
                />
              </SelectTrigger>
              <SelectContent>
                {field.options?.length > 0 ? (
                  field.options.map((item, i) => (
                    <SelectItem key={i} value={item}>
                      {item}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="">
                    No options available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          ) : field?.fieldType === "radio" ? (
            <RadioGroup required={field?.required}>
              {field.options?.length > 0 ? (
                field.options.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 mt-1">
                    <RadioGroupItem
                      value={item}
                      id={item}
                      onClick={() => handleSelectChange(field.fieldName, item)}
                    />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No options available</p>
              )}
            </RadioGroup>
          ) : field?.fieldType === "checkbox" ? (
            <div className="my-3 w-full">
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={(v) =>
                    handleCheckboxChange(field.fieldName, field.label, v)
                  }
                />
                <Label>{field.label}</Label>
              </div>
            </div>
          ) : (
            <div className="my-3 w-full">
              <Input
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
                className="bg-transparent mt-1"
                required={field?.required}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      ))}

      {!enabledSignIn ? (
        <button className="btn btn-primary">Submit</button>
      ) : isSignedIn ? (
        <button className="btn btn-primary">Submit</button>
      ) : (
        <Button>
          <SignInButton mode="modal">Sign In before Submit</SignInButton>
        </Button>
      )}
    </form>
  );
}

export default FormUi;
