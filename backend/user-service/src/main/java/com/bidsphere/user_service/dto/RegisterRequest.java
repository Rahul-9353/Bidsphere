package com.bidsphere.user_service.dto;

import com.bidsphere.user_service.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\d)(?=.*[@$!%*?&#^()_\\-+=]).{8,}$",
            message = "Password must be at least 8 character and include an uppercase, a lowercase letter, a number and a special character"
    )
    private String password;

    @NotBlank(message = "Role is required")
    private Role role;

    private String phone;
}
