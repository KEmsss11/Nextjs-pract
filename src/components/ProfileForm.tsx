"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";


type ProfileFormProps = {
  firstName?: string;
  lastName?: string;
  cityMunicipality?: string;
  phoneNumber?: string;
};

export function ProfileForm({
  firstName = "",
  lastName = "",
  cityMunicipality = "",
  phoneNumber = "",
}: ProfileFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    cityMunicipality: cityMunicipality ?? "",
    phoneNumber: phoneNumber ?? "",
  });


  function updateField(field: keyof typeof formValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      setError(result?.error ?? "Failed to save profile.");
      setSaving(false);
      return;
    }

    router.refresh();
    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={() =>
        setFormValues({ firstName, lastName, cityMunicipality, phoneNumber })
      }
    >
      <FieldSet className="w-full max-w-sm">
        <FieldLegend>Personal Information</FieldLegend>
        <FieldDescription>
          Update your personal details and profile information.
        </FieldDescription>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-10">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formValues.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formValues.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                required
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <Field>
              <FieldLabel htmlFor="cityMunicipality">City/Municipality</FieldLabel>
              <Input
                id="cityMunicipality"
                name="cityMunicipality"
                type="text"
                value={formValues.cityMunicipality}
                onChange={(event) => updateField("cityMunicipality", event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phoneNumber">Phone</FieldLabel>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formValues.phoneNumber}
                onChange={(event) => updateField("phoneNumber", event.target.value)}
              />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      <div className="mt-6 flex justify-end gap-2">
        <Button type="reset" variant="outline" className="text-white hover:bg-black">Decline</Button>
        <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Accept"}</Button>
      </div>
    </form>
  );
}
