import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { hashString, hashFile, verifyFile } from "../services/md5.service";

const Md5: React.FC = () => {
  const [inputString, setInputString] = useState("");
  const [fileForHash, setFileForHash] = useState<File | null>(null);
  const [fileForVerification, setFileForVerification] = useState<File | null>(null);
  const [hashResultString, setHashResultString] = useState("");
  const [hashResultFile, setHashResultFile] = useState("");
  const [expectedHash, setExpectedHash] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  const [loadingStringHash, setLoadingStringHash] = useState(false);
  const [loadingFileHash, setLoadingFileHash] = useState(false);
  const [loadingFileVerification, setLoadingFileVerification] = useState(false);

  const handleHashString = async () => {
    setLoadingStringHash(true);
    try {
      const hash = await hashString(inputString);
      setHashResultString(hash);
    } catch (error) {
      console.error("Error hashing string:", error);
    } finally {
      setLoadingStringHash(false);
    }
  };

  const handleFileChangeForHash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileForHash(files[0]);
    }
  };

  const handleFileChangeForVerification = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileForVerification(files[0]);
    }
  };

  const handleFileHash = async () => {
    if (!fileForHash) {
      console.error("No file selected for hashing");
      return;
    }
    setLoadingFileHash(true);

    try {
      const hash = await hashFile(fileForHash);
      setHashResultFile(hash);
    } catch (error) {
      console.error("Error hashing file:", error);
    } finally {
      setLoadingFileHash(false);
    }
  };

  const handleFileVerification = async () => {
    if (!fileForVerification) {
      console.error("No file selected for verification");
      return;
    }
    setLoadingFileVerification(true);

    try {
      const result = await verifyFile(fileForVerification, expectedHash);
      setVerificationResult(result);
    } catch (error) {
      console.error("Error verifying file:", error);
    } finally {
      setLoadingFileVerification(false);
    }
  };
  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#1e1e1e",
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            minHeight: "300px",
          }}
        >
          <Typography variant="h5" sx={{ color: "#FFD700" }}>
            Hash String
          </Typography>
          <TextField
            label="Input String"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 2, input: { color: "#FFD700" }, "& .MuiInputLabel-root": { color: "#FFD700" } }}
          />
          <Button variant="contained" color="warning" onClick={handleHashString} disabled={loadingStringHash}>
            Hash String
          </Button>
          {loadingStringHash && <CircularProgress size={24} sx={{ ml: 2 }} />}
          {hashResultString && (
            <Typography variant="body1" sx={{ mt: 2, color: "#fff" }}>
              Hash Result: {hashResultString}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            backgroundColor: "#1e1e1e",
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            minHeight: "300px",
          }}
        >
          <Typography variant="h5" sx={{ color: "#FFD700" }}>
            Upload File for Hashing
          </Typography>
          <input type="file" id="file-upload-hash" onChange={handleFileChangeForHash} style={{ display: "none" }} />
          <label htmlFor="file-upload-hash">
            <Button
              variant="contained"
              component="span"
              color="warning"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2, width: "100%" }}
            >
              Choose File
            </Button>
          </label>
          {fileForHash && (
            <Typography variant="body2" sx={{ color: "#FFD700", mb: 2 }}>
              Selected File for Hashing: {fileForHash.name}
            </Typography>
          )}
          <Button variant="contained" color="warning" onClick={handleFileHash} disabled={loadingFileHash}>
            Get File Hash
          </Button>
          {loadingFileHash && <CircularProgress size={24} sx={{ ml: 2 }} />}
          {hashResultFile && (
            <Typography variant="body1" sx={{ mt: 2, color: "#fff" }}>
              Hash Result: {hashResultFile}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ backgroundColor: "#1e1e1e", p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ color: "#FFD700" }}>
          Verify File Integrity
        </Typography>
        <input
          type="file"
          id="file-upload-verification"
          onChange={handleFileChangeForVerification}
          style={{ display: "none" }}
        />
        <label htmlFor="file-upload-verification">
          <Button
            variant="contained"
            component="span"
            color="warning"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2, width: "100%" }}
          >
            Choose File for Verification
          </Button>
        </label>
        {fileForVerification && (
          <Typography variant="body2" sx={{ color: "#FFD700", mb: 2 }}>
            Selected File for Verification: {fileForVerification.name}{" "}
          </Typography>
        )}
        <TextField
          label="Expected Hash"
          value={expectedHash}
          onChange={(e) => setExpectedHash(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2, input: { color: "#FFD700" }, "& .MuiInputLabel-root": { color: "#FFD700" } }}
        />
        <Button variant="contained" color="warning" onClick={handleFileVerification} disabled={loadingFileVerification}>
          Verify File
        </Button>
        {loadingFileVerification && <CircularProgress size={24} sx={{ ml: 2 }} />}
        {verificationResult !== null && (
          <Typography variant="body1" sx={{ mt: 2, color: "#fff" }}>
            Verification Result: {verificationResult ? "Valid" : "Invalid"}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Md5;
