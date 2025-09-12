import React, { useState, useRef } from 'react';
import { Camera, Edit, Save, X, User, Mail, Calendar, Building, MapPin, Badge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const sampleFacultyData = {
  "_id": "68c152eb4ccf23cbea305d85",
  "fullName": "Rajodiya Kenil Ashokbhai",
  "email": "23be139@nirmauni.ac.in",
  "profilePic": "https://res.cloudinary.com/dotjcgaai/image/upload/v1757500137/a9mv3jeeiiqmx99zrcom.png",
  "role": "faculty",
  "dob": "2005-11-19T00:00:00.000Z",
  "university": {
    "_id": "68c14c44986cc6876d4444b3",
    "name": "nirma university",
    "address": "Ahmedabad, Gujarat, India"
  },
  "faculty": {
    "_id": "68c152eb4ccf23cbea305d87",
    "user": "68c152eb4ccf23cbea305d85",
    "facultyId": "FAC-001"
  }
};

const FacultyProfile = () => {
  const [facultyData, setFacultyData] = useState(sampleFacultyData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(sampleFacultyData);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...facultyData });
  };

  const handleSave = () => {
    setFacultyData({ ...editedData });
    if (profilePicPreview) {
      setFacultyData(prev => ({ ...prev, profilePic: profilePicPreview }));
    }
    setIsEditing(false);
    setProfilePicPreview(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(facultyData);
    setProfilePicPreview(null);
  };

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setEditedData(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value
        }
      }));
    } else {
      setEditedData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayData = isEditing ? editedData : facultyData;
  const currentProfilePic = profilePicPreview || displayData.profilePic;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Faculty Profile</h1>
          <p className="text-muted-foreground">Manage your profile information</p>
        </div>
        
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={handleEdit} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Header Card */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/20">
                <AvatarImage 
                  src={currentProfilePic} 
                  alt={displayData.fullName}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {displayData.fullName?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full shadow-lg"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={editedData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="text-xl font-bold"
                  />
                </div>
              ) : (
                <h2 className="text-2xl font-bold text-foreground">{displayData.fullName}</h2>
              )}
              
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                <Badge className="h-4 w-4" />
                <span className="font-medium">Faculty Member</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{displayData.university?.name}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Faculty ID - Non-editable */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Badge className="h-4 w-4" />
              Faculty ID
            </Label>
            <Input
              value={displayData.faculty?.facultyId}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Email - Non-editable */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              value={displayData.email}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Date of Birth - Editable */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date of Birth
            </Label>
            {isEditing ? (
              <Input
                type="date"
                value={editedData.dob?.split('T')[0]}
                onChange={(e) => handleInputChange('dob', e.target.value + 'T00:00:00.000Z')}
              />
            ) : (
              <Input
                value={formatDate(displayData.dob)}
                disabled
                className="bg-background"
              />
            )}
          </div>

          {/* Role/Designation - Editable */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Designation
            </Label>
            {isEditing ? (
              <Input
                value={editedData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            ) : (
              <Input
                value={displayData.role}
                disabled
                className="bg-background"
              />
            )}
          </div>

          {/* University Name - Editable */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              University Name
            </Label>
            {isEditing ? (
              <Input
                value={editedData.university?.name}
                onChange={(e) => handleInputChange('name', e.target.value, 'university')}
              />
            ) : (
              <Input
                value={displayData.university?.name}
                disabled
                className="bg-background"
              />
            )}
          </div>

          {/* University Address - Editable */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              University Address
            </Label>
            {isEditing ? (
              <Input
                value={editedData.university?.address}
                onChange={(e) => handleInputChange('address', e.target.value, 'university')}
              />
            ) : (
              <Input
                value={displayData.university?.address}
                disabled
                className="bg-background"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyProfile;