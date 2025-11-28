import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentUploadSection = ({ formData, onChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newFiles = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      file: file,
      uploadDate: new Date()?.toLocaleDateString()
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    onChange({ target: { name: 'documents', value: [...uploadedFiles, ...newFiles] } });
  };

  const removeFile = (fileId) => {
    const updatedFiles = uploadedFiles?.filter(file => file?.id !== fileId);
    setUploadedFiles(updatedFiles);
    onChange({ target: { name: 'documents', value: updatedFiles } });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) return 'FileText';
    if (fileType?.includes('image')) return 'Image';
    if (fileType?.includes('word') || fileType?.includes('document')) return 'FileText';
    return 'File';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Documents & Certifications
      </h3>
      <div className="space-y-4">
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <Icon name="Upload" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Upload medical licenses, certifications, and credentials
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
          </p>
          
          <Input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="document-upload"
          />
          
          <Button
            variant="outline"
            onClick={() => document.getElementById('document-upload')?.click()}
            iconName="Plus"
            iconPosition="left"
          >
            Choose Files
          </Button>
        </div>

        {uploadedFiles?.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Uploaded Documents</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {uploadedFiles?.map((file) => (
                <div key={file?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name={getFileIcon(file?.type)} size={16} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground truncate max-w-48">
                        {file?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file?.size)} • Uploaded {file?.uploadDate}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file?.id)}
                    iconName="X"
                    className="text-muted-foreground hover:text-destructive"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
          <Input
            label="License Number"
            type="text"
            name="licenseNumber"
            placeholder="Enter medical license number"
            value={formData?.licenseNumber}
            onChange={onChange}
            description="Required for medical staff"
          />
          
          <Input
            label="License Expiry Date"
            type="date"
            name="licenseExpiry"
            value={formData?.licenseExpiry}
            onChange={onChange}
            description="License expiration date"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadSection;