// DOM Elements
const form = document.getElementById("redeemForm");
const submitBtn = document.getElementById("submitBtn");
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const termsModal = document.getElementById("termsModal");
const privacyModal = document.getElementById("privacyModal");
const successCode = document.getElementById("successCode");
const successTime = document.getElementById("successTime");
const errorMessage = document.getElementById("errorMessage");

// Form validation rules
const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "請輸入有效的電子郵件地址",
  },
  username: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\u4e00-\u9fff_-]+$/,
    message: "使用者名稱只能包含中英文、數字、底線和連字號，長度2-50字元",
  },
  redeemCode: {
    required: true,
    minLength: 6,
    maxLength: 20,
    pattern: /^[A-Z0-9-]+$/,
    message: "兌換碼格式不正確，只能包含大寫字母、數字和連字號，長度6-20字元",
  },
  terms: {
    required: true,
    message: "請同意服務條款和隱私政策",
  },
};

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeForm();
  setupEventListeners();
});

// Initialize form
function initializeForm() {
  // Add real-time validation
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearFieldError(input));
  });
}

// Setup event listeners
function setupEventListeners() {
  form.addEventListener("submit", handleFormSubmit);

  // Close modals when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === successModal) {
      closeModal();
    }
    if (event.target === errorModal) {
      closeModal();
    }
    if (event.target === termsModal) {
      closeModal();
    }
    if (event.target === privacyModal) {
      closeModal();
    }
  });

  // Close modals with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  // Validate all fields
  const isValid = validateForm();
  if (!isValid) {
    return;
  }

  // Show loading state
  setLoadingState(true);

  try {
    // Simulate API call
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      showSuccessModal(data);
    } else {
      showErrorModal("兌換碼無效或已過期，請檢查後重試");
    }
  } catch (error) {
    console.error("Redeem error:", error);
    showErrorModal("網路連線錯誤，請稍後再試");
  } finally {
    setLoadingState(false);
  }
}

// Validate entire form
function validateForm() {
  let isValid = true;
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  return isValid;
}

// Validate individual field
function validateField(input) {
  const fieldName = input.name;
  const value = input.value.trim();
  const rules = validationRules[fieldName];

  if (!rules) return true;

  let isValid = true;
  let errorMsg = "";

  // Required validation
  if (rules.required && !value) {
    isValid = false;
    errorMsg = rules.message || "此欄位為必填";
  }

  // Pattern validation
  if (isValid && value && rules.pattern && !rules.pattern.test(value)) {
    isValid = false;
    errorMsg = rules.message;
  }

  // Length validation
  if (isValid && value) {
    if (rules.minLength && value.length < rules.minLength) {
      isValid = false;
      errorMsg = rules.message;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMsg = rules.message;
    }
  }

  // Show/hide error
  if (isValid) {
    clearFieldError(input);
  } else {
    showFieldError(input, errorMsg);
  }

  return isValid;
}

// Show field error
function showFieldError(input, message) {
  input.classList.add("error");
  const errorElement = document.getElementById(input.name + "Error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }
}

// Clear field error
function clearFieldError(input) {
  input.classList.remove("error");
  const errorElement = document.getElementById(input.name + "Error");
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }
}

// Set loading state
function setLoadingState(isLoading) {
  submitBtn.disabled = isLoading;

  if (isLoading) {
    submitBtn.innerHTML = '<span class="loading"></span> 處理中...';
  } else {
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> 領取兌換碼';
  }
}

// Show success modal
function showSuccessModal(data) {
  // Generate a mock redeem code
  const redeemCode = generateRedeemCode();
  const currentTime = new Date().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  successCode.textContent = redeemCode;
  successTime.textContent = currentTime;

  successModal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Reset form
  form.reset();
}

// Show error modal
function showErrorModal(message) {
  errorMessage.textContent = message;
  errorModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  successModal.style.display = "none";
  errorModal.style.display = "none";
  termsModal.style.display = "none";
  privacyModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Open Terms of Service modal
function openTermsModal() {
  termsModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Open Privacy Policy modal
function openPrivacyModal() {
  privacyModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Generate mock redeem code
function generateRedeemCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Copy code to clipboard
async function copyCode() {
  const code = successCode.textContent;

  try {
    await navigator.clipboard.writeText(code);

    // Show success feedback
    const copyBtn = document.querySelector(".btn-primary");
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> 已複製';
    copyBtn.style.background = "#27ae60";

    setTimeout(() => {
      copyBtn.innerHTML = originalText;
      copyBtn.style.background = "";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy: ", err);

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    alert("兌換碼已複製到剪貼簿");
  }
}

// Utility function to format date
function formatDate(date) {
  return date.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Add some interactive animations
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to form inputs
  const inputs = document.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
    });
  });

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";
});

// Add keyboard navigation support
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && event.target.tagName !== "BUTTON") {
    const form = event.target.closest("form");
    if (form) {
      event.preventDefault();
      const inputs = Array.from(form.querySelectorAll("input"));
      const currentIndex = inputs.indexOf(event.target);
      const nextInput = inputs[currentIndex + 1];

      if (nextInput) {
        nextInput.focus();
      } else {
        form.querySelector('button[type="submit"]').click();
      }
    }
  }
});
