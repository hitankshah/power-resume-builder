import React, { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { exportToPdf } from '@/utils/pdfUtils';
import { exportToDocx } from '@/utils/docxUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Profile = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const [selectedFont, setSelectedFont] = useState("Arial");

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const handleExportPDF = async () => {
    await exportToPdf("resume-preview-container", "resume.pdf");
  };

  const handleExportDOCX = async () => {
    await exportToDocx("resume-preview-container", "resume.docx");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <p className="text-muted-foreground mb-8">Name: {user?.user_metadata?.full_name || 'User'}</p>
      <p className="text-muted-foreground mb-8">Email: {user?.email}</p>
      <div className="flex space-x-4 mb-8">
        <Button variant="outline" onClick={handleExportPDF}>
          Export as PDF
        </Button>
        <Button variant="outline" onClick={handleExportDOCX}>
          Export as DOCX
        </Button>
      </div>
      <div className="mb-8">
        <Select 
          value={selectedFont}
          onValueChange={(value) => setSelectedFont(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Arial">Arial</SelectItem>
            <SelectItem value="Times New Roman">Times New Roman</SelectItem>
            <SelectItem value="Courier New">Courier New</SelectItem>
            <SelectItem value="Georgia">Georgia</SelectItem>
            <SelectItem value="Verdana">Verdana</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default Profile;
