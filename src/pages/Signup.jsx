import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import signupIllustration from "@/assets/signup-illustration.jpg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    email: "",
    department: "",
    dateOfBirth: undefined,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const departments = [
    { value: "CSE", label: "Computer Science Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "ECE", label: "Electronics & Communication Engineering" },
    { value: "ME", label: "Mechanical Engineering" },
    { value: "CE", label: "Civil Engineering" },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@nirmauni\.ac\.in$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email must be from nirmauni.ac.in domain";
    }
    
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Signup form submitted:", formData);
      // Handle signup logic here
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen bg-gradient-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-hidden">
        <div className="w-full max-w-6xl bg-card rounded-2xl shadow-card overflow-hidden h-full max-h-[calc(100vh-8rem)]">
          <div className="grid lg:grid-cols-2 gap-0 h-full">
            {/* Form Section */}
            <div className="p-8 lg:p-12 overflow-y-auto">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-foreground mb-8">Sign up</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={`w-full bg-muted border-0 rounded-full px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary ${
                        errors.fullName ? "ring-2 ring-destructive" : ""
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-sm font-medium text-foreground">
                      Roll Number
                    </Label>
                    <Input
                      id="rollNumber"
                      type="text"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      className={`w-full bg-muted border-0 rounded-full px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary ${
                        errors.rollNumber ? "ring-2 ring-destructive" : ""
                      }`}
                      placeholder="Enter your roll number"
                    />
                    {errors.rollNumber && (
                      <p className="text-sm text-destructive">{errors.rollNumber}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`w-full bg-muted border-0 rounded-full px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary ${
                        errors.email ? "ring-2 ring-destructive" : ""
                      }`}
                      placeholder="example@nirmauni.ac.in"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Department
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("department", value)}>
                      <SelectTrigger className={`w-full bg-muted border-0 rounded-full px-4 py-3 text-foreground focus:ring-2 focus:ring-primary ${
                        errors.department ? "ring-2 ring-destructive" : ""
                      }`}>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border rounded-lg shadow-soft">
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value} className="hover:bg-accent">
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.department && (
                      <p className="text-sm text-destructive">{errors.department}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Date of Birth
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full bg-muted border-0 rounded-full px-4 py-3 text-left font-normal text-foreground hover:bg-muted focus:ring-2 focus:ring-primary",
                            !formData.dateOfBirth && "text-muted-foreground",
                            errors.dateOfBirth && "ring-2 ring-destructive"
                          )}
                        >
                          {formData.dateOfBirth ? (
                            format(formData.dateOfBirth, "PPP")
                          ) : (
                            <span>Pick your date of birth</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-card border border-border rounded-lg shadow-soft" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBirth}
                          onSelect={(date) => handleInputChange("dateOfBirth", date)}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dateOfBirth && (
                      <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Profile Picture
                    </Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {profilePreview ? (
                          <img
                            src={profilePreview}
                            alt="Profile preview"
                            className="w-16 h-16 rounded-full object-cover border-2 border-border"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                            <User className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="profile-upload"
                        />
                        <Label htmlFor="profile-upload">
                          <Button type="button" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer" asChild>
                            <span className="flex items-center justify-center">
                              <Upload className="w-4 h-4 mr-2" />
                              Choose File
                            </span>
                          </Button>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          className={`w-full bg-muted border-0 rounded-full px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary ${
                            errors.password ? "ring-2 ring-destructive" : ""
                          }`}
                          placeholder="Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          className={`w-full bg-muted border-0 rounded-full px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary ${
                            errors.confirmPassword ? "ring-2 ring-destructive" : ""
                          }`}
                          placeholder="Confirm Password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium py-3 rounded-full transition-all duration-300 shadow-soft"
                  >
                    Create Account
                  </Button>

                  <div className="text-center">
                    <span className="text-muted-foreground">or </span>
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Log in
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Illustration Section */}
            <div className="hidden lg:flex items-center justify-center bg-accent/30 p-12">
              <div className="relative">
                <img
                  src={signupIllustration}
                  alt="Signup illustration"
                  className="w-full h-auto max-w-md rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;