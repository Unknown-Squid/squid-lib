# Examples & Recipes

Real-world usage examples for squid-lib-frontend components and patterns.

## Table of Contents

1. [Login Form](#login-form)
2. [Registration Form](#registration-form)
3. [Profile Editor](#profile-editor)
4. [Multi-step Wizard](#multi-step-wizard)
5. [File Upload](#file-upload)
6. [Search & Filter](#search--filter)
7. [Dynamic Fields](#dynamic-fields)

---

## Login Form

Simple login form with email and password validation.

```tsx
import {
  Button,
  FormField,
  Input,
  FieldError,
} from "squid-lib-frontend/components/ui";
import {
  loginFormSchema,
  safeParseForm,
  type LoginFormValues,
} from "squid-lib-frontend/validation";
import { useToast } from "squid-lib-frontend/hooks";
import { useState } from "react";

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form
      const result = safeParseForm(loginFormSchema, formData);

      if (!result.success) {
        setErrors(result.errors);
        setIsSubmitting(false);
        return;
      }

      // Submit to API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.fieldErrors) {
          setErrors(error.fieldErrors);
        } else {
          showToast({
            message: error.message || "Login failed",
            variant: "error",
          });
        }
        return;
      }

      showToast({ message: "Login successful!", variant: "success" });
      // Redirect or handle success
    } catch (error) {
      showToast({
        message: "Network error. Please try again.",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2>Login</h2>

      <FormField label="Email" htmlFor="email" required>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="you@example.com"
          fieldStatus={errors.email ? "error" : "default"}
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Password" htmlFor="password" required>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="••••••••"
          fieldStatus={errors.password ? "error" : "default"}
          disabled={isSubmitting}
        />
      </FormField>

      {errors.submit && (
        <FieldError>{errors.submit}</FieldError>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
```

---

## Registration Form

Complete registration with password confirmation and agreement.

```tsx
import {
  Button,
  Checkbox,
  FormField,
  Input,
  Label,
  HelperText,
} from "squid-lib-frontend/components/ui";
import {
  registrationFormSchema,
  safeParseForm,
  type RegistrationFormValues,
} from "squid-lib-frontend/validation";
import { useToast } from "squid-lib-frontend/hooks";
import { useState } from "react";
import { z } from "zod";

export function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!agreeToTerms) {
      setErrors({ terms: "You must agree to the terms" });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = safeParseForm(registrationFormSchema, formData);

      if (!result.success) {
        setErrors(result.errors);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, agreeToTerms }),
      });

      if (!response.ok) {
        const error = await response.json();
        showToast({
          message: error.message || "Registration failed",
          variant: "error",
        });
        return;
      }

      showToast({
        message: "Account created! Check your email to verify.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message: "Network error",
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2>Create Account</h2>

      <FormField label="Email" htmlFor="email" required>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          fieldStatus={errors.email ? "error" : "default"}
        />
      </FormField>

      <FormField label="Password" htmlFor="password" required>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          fieldStatus={errors.password ? "error" : "default"}
        />
        {!errors.password && (
          <HelperText>Must be at least 8 characters</HelperText>
        )}
      </FormField>

      <FormField label="Confirm Password" htmlFor="confirm" required>
        <Input
          id="confirm"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
          fieldStatus={errors.confirmPassword ? "error" : "default"}
        />
      </FormField>

      <label className="flex items-center gap-2">
        <Checkbox
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
        />
        <span>I agree to the Terms of Service</span>
      </label>
      {errors.terms && <FieldError>{errors.terms}</FieldError>}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || !agreeToTerms}
      >
        {isSubmitting ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
```

---

## Profile Editor

Form with multiple field types and live validation feedback.

```tsx
import {
  Button,
  FormField,
  Input,
  Textarea,
  Select,
  Switch,
  FileInput,
  Badge,
} from "squid-lib-frontend/components/ui";
import { useToast } from "squid-lib-frontend/hooks";
import { useState } from "react";

type ProfileData = {
  name: string;
  bio: string;
  email: string;
  role: string;
  newsletter: boolean;
  avatar?: File;
};

export function ProfileEditor() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    bio: "",
    email: "",
    role: "user",
    newsletter: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const errors = validate(profile);

  const handleChange = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      showToast({
        message: "Please fix errors before saving",
        variant: "error",
      });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error("Failed to save");

      showToast({
        message: "Profile saved successfully!",
        variant: "success",
      });
    } catch (error) {
      showToast({
        message: "Failed to save profile",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2>Edit Profile</h2>

      <FormField
        label="Name"
        htmlFor="name"
        error={touched.name ? errors.name : undefined}
        success={
          touched.name && !errors.name ? "Looking good!" : undefined
        }
        required
      >
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          fieldStatus={
            touched.name && errors.name
              ? "error"
              : touched.name && !errors.name
              ? "success"
              : "default"
          }
        />
      </FormField>

      <FormField label="Email" htmlFor="email" required>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
        />
      </FormField>

      <FormField label="Bio" htmlFor="bio" description="Tell us about yourself">
        <Textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={4}
        />
      </FormField>

      <FormField label="Role" htmlFor="role">
        <Select
          id="role"
          value={profile.role}
          onChange={(e) => handleChange("role", e.target.value)}
        >
          <option value="user">User</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </Select>
      </FormField>

      <FormField label="Avatar" htmlFor="avatar" description="Max 5MB">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) =>
            handleChange("avatar", e.target.files?.[0])
          }
        />
      </FormField>

      <label className="flex items-center justify-between">
        <span>Subscribe to newsletter</span>
        <Switch
          checked={profile.newsletter}
          onChange={(e) =>
            handleChange("newsletter", e.target.checked)
          }
        />
      </label>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => setProfile({
            name: "",
            bio: "",
            email: "",
            role: "user",
            newsletter: false,
          })}
        >
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

function validate(profile: ProfileData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!profile.name.trim()) {
    errors.name = "Name is required";
  } else if (profile.name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!profile.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = "Valid email required";
  }

  return errors;
}
```

---

## Multi-step Wizard

Wizard form using Stepper component with validation between steps.

```tsx
import {
  Button,
  FormField,
  Input,
  Stepper,
  Select,
  Textarea,
} from "squid-lib-frontend/components/ui";
import { useState } from "react";

const STEPS = ["Personal Info", "Address", "Summary"];

export function RegistrationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "",
  });

  const canProceed = validateStep(currentStep, formData);

  const handleNext = () => {
    if (canProceed && currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed) return;

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Registration complete!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Stepper steps={STEPS} currentIndex={currentStep} />

      <div className="border rounded-lg p-6">
        {currentStep === 0 && (
          <PersonalInfoStep formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 1 && (
          <AddressStep formData={formData} setFormData={setFormData} />
        )}
        {currentStep === 2 && (
          <SummaryStep formData={formData} />
        )}
      </div>

      <div className="flex gap-2 justify-between">
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          Back
        </Button>

        {currentStep < STEPS.length - 1 ? (
          <Button onClick={handleNext} disabled={!canProceed}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canProceed}>
            Complete
          </Button>
        )}
      </div>
    </div>
  );
}

// Step Components
function PersonalInfoStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h3>Personal Information</h3>

      <FormField label="First Name" required>
        <Input
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
      </FormField>

      <FormField label="Last Name" required>
        <Input
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
      </FormField>

      <FormField label="Email" required>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </FormField>
    </div>
  );
}

function AddressStep({ formData, setFormData }: any) {
  return (
    <div className="space-y-4">
      <h3>Address</h3>

      <FormField label="Street Address" required>
        <Input
          value={formData.street}
          onChange={(e) =>
            setFormData({ ...formData, street: e.target.value })
          }
        />
      </FormField>

      <FormField label="City" required>
        <Input
          value={formData.city}
          onChange={(e) =>
            setFormData({ ...formData, city: e.target.value })
          }
        />
      </FormField>

      <FormField label="Country" required>
        <Select
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        >
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </Select>
      </FormField>
    </div>
  );
}

function SummaryStep({ formData }: any) {
  return (
    <div className="space-y-4">
      <h3>Review Your Information</h3>

      <div className="bg-gray-50 rounded p-4 space-y-2">
        <p>
          <strong>Name:</strong> {formData.firstName} {formData.lastName}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Address:</strong> {formData.street}, {formData.city},{" "}
          {formData.country}
        </p>
      </div>

      <p className="text-sm text-gray-600">
        Please review your information before completing registration.
      </p>
    </div>
  );
}

function validateStep(step: number, formData: any): boolean {
  if (step === 0) {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.includes("@")
    );
  }
  if (step === 1) {
    return (
      formData.street.trim() &&
      formData.city.trim() &&
      formData.country.trim()
    );
  }
  return true;
}
```

---

## File Upload

File input with preview and validation.

```tsx
import {
  FormField,
  FileInput,
  Button,
  Badge,
} from "squid-lib-frontend/components/ui";
import { useToast } from "squid-lib-frontend/hooks";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function FileUploadExample() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File is too large (max 5MB)");
      setFile(null);
      return;
    }

    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setError("Only image files are allowed");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      showToast({
        message: "File uploaded successfully!",
        variant: "success",
      });

      setFile(null);
      setPreview("");
    } catch (error) {
      showToast({
        message: "Upload failed",
        variant: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <FormField
        label="Upload Image"
        description="PNG, JPG, or WebP (max 5MB)"
        error={error}
      >
        <FileInput
          accept="image/*"
          onChange={handleFileChange}
          fieldStatus={error ? "error" : file ? "success" : "default"}
        />
      </FormField>

      {preview && (
        <div className="border rounded-lg p-4">
          <img src={preview} alt="Preview" className="w-full h-auto" />
          <div className="mt-2">
            <Badge variant="info" size="sm">
              {file?.name}
            </Badge>
          </div>
        </div>
      )}

      {file && (
        <Button onClick={handleUpload} disabled={isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload File"}
        </Button>
      )}
    </div>
  );
}
```

---

For more examples and patterns, visit the `/playground` page in development.

See [API.md](./API.md) for complete component API reference.
See [VALIDATION.md](./VALIDATION.md) for advanced validation patterns.