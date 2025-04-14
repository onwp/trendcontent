// AI Service for handling API calls to different AI providers

export interface AIRequestParams {
  prompt: string;
  model: string;
  tone?: string;
  length?: number;
  seoOptimized?: boolean;
  customInstructions?: string;
  trend?: string;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  error?: string;
}

// Check if API keys are available
const getAPIKey = (provider: string): string | null => {
  switch (provider) {
    case "openai":
      return import.meta.env.VITE_OPENAI_API_KEY || null;
    case "gemini":
      return import.meta.env.VITE_GEMINI_API_KEY || null;
    case "perplexity":
      return import.meta.env.VITE_PERPLEXITY_API_KEY || null;
    case "anthropic":
      return import.meta.env.VITE_ANTHROPIC_API_KEY || null;
    default:
      return null;
  }
};

// OpenAI API integration
const generateWithOpenAI = async (
  params: AIRequestParams,
): Promise<AIResponse> => {
  try {
    const apiKey = getAPIKey("openai");

    if (!apiKey) {
      console.warn("OpenAI API key not found. Using simulated response.");
      return simulateOpenAIResponse(params);
    }

    console.log("Generating content with OpenAI API:", params);

    // Construct a prompt based on parameters
    const fullPrompt = constructPrompt(params);

    // Prepare the request to OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a professional content writer specializing in SEO-optimized content. Format your response in HTML with appropriate h2, h3, p, ul, li tags.",
          },
          {
            role: "user",
            content: fullPrompt,
          },
        ],
        max_tokens: params.length
          ? Math.min(Math.floor(params.length * 1.5), 4000)
          : 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Error calling OpenAI API");
    }

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
      model: "gpt-4",
      usage: {
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
        totalTokens: data.usage?.total_tokens,
      },
    };
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    return {
      content: "",
      model: "gpt-4",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Simulate OpenAI response for when API key is not available
const simulateOpenAIResponse = async (
  params: AIRequestParams,
): Promise<AIResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    content: `<h2>Understanding ${params.trend}</h2><p>In today's rapidly evolving digital landscape, ${params.trend} has emerged as a transformative force across industries. This technology continues to reshape how businesses operate and how consumers interact with products and services.</p><p>Recent studies indicate that adoption of ${params.trend} has increased by 45% in the past year alone, with organizations reporting significant improvements in efficiency and customer satisfaction.</p><h3>Key Benefits</h3><ul><li>Enhanced operational efficiency</li><li>Improved decision-making capabilities</li><li>Reduced costs and resource utilization</li><li>Personalized customer experiences</li></ul><p>As we look toward the future, the potential applications of ${params.trend} appear limitless, promising continued innovation and disruption across the global economy.</p>`,
    model: "gpt-4",
    usage: {
      promptTokens: 150,
      completionTokens: 250,
      totalTokens: 400,
    },
  };
};

// Google Gemini API integration
const generateWithGemini = async (
  params: AIRequestParams,
): Promise<AIResponse> => {
  try {
    const apiKey = getAPIKey("gemini");

    if (!apiKey) {
      console.warn("Gemini API key not found. Using simulated response.");
      return simulateGeminiResponse(params);
    }

    console.log("Generating content with Gemini API:", params);

    // Construct a prompt based on parameters
    const fullPrompt = constructPrompt(params);

    // Prepare the request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a professional content writer specializing in data-driven analysis. Format your response in HTML with appropriate h2, h3, p, ul, li tags. ${fullPrompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: params.length
              ? Math.min(Math.floor(params.length * 1.5), 2048)
              : 1024,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Error calling Gemini API");
    }

    const data = await response.json();

    return {
      content: data.candidates[0].content.parts[0].text,
      model: "gemini-pro",
      usage: {
        totalTokens: data.usageMetadata?.totalTokenCount || 380,
      },
    };
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return {
      content: "",
      model: "gemini-pro",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Simulate Gemini response for when API key is not available
const simulateGeminiResponse = async (
  params: AIRequestParams,
): Promise<AIResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1800));

  return {
    content: `<h2>${params.trend}: A Data-Driven Analysis</h2><p>${params.trend} represents a significant shift in how organizations approach their operations and strategy. Based on our analysis of recent market data, this trend is gaining momentum across multiple sectors.</p><p>Statistical evidence suggests a correlation between early adoption of ${params.trend} and increased market share, with a 37% improvement in operational metrics among leading implementers.</p><h3>Implementation Considerations</h3><ul><li>Data infrastructure requirements</li><li>Integration with existing systems</li><li>Staff training and change management</li><li>ROI measurement frameworks</li></ul><p>Organizations should consider a phased approach to implementation, prioritizing high-impact areas while developing comprehensive governance frameworks.</p>`,
    model: "gemini-pro",
    usage: {
      totalTokens: 380,
    },
  };
};

// Perplexity API integration
const generateWithPerplexity = async (
  params: AIRequestParams,
): Promise<AIResponse> => {
  try {
    const apiKey = getAPIKey("perplexity");

    if (!apiKey) {
      console.warn("Perplexity API key not found. Using simulated response.");
      return simulatePerplexityResponse(params);
    }

    console.log("Generating content with Perplexity API:", params);

    // Construct a prompt based on parameters
    const fullPrompt = constructPrompt(params);

    // Prepare the request to Perplexity API
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar-medium-online",
        messages: [
          {
            role: "system",
            content:
              "You are a research specialist who creates well-structured content summaries. Format your response in HTML with appropriate h2, h3, p, ul, li tags.",
          },
          {
            role: "user",
            content: fullPrompt,
          },
        ],
        max_tokens: params.length
          ? Math.min(Math.floor(params.length * 1.5), 4000)
          : 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Error calling Perplexity API",
      );
    }

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
      model: "perplexity-online",
      usage: {
        totalTokens: data.usage?.total_tokens || 420,
      },
    };
  } catch (error) {
    console.error("Error generating content with Perplexity:", error);
    return {
      content: "",
      model: "perplexity-online",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Simulate Perplexity response for when API key is not available
const simulatePerplexityResponse = async (
  params: AIRequestParams,
): Promise<AIResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2200));

  return {
    content: `<h2>Research Summary: ${params.trend}</h2><p>Our comprehensive analysis of ${params.trend} reveals several key insights based on recent academic publications and industry reports. This emerging field continues to attract significant attention from researchers and practitioners alike.</p><p>According to a recent meta-analysis published in the Journal of Technology Innovation, organizations implementing ${params.trend} reported a 42% increase in innovation metrics and a 28% reduction in operational costs.</p><h3>Research Highlights</h3><ul><li>Comparative analysis of implementation methodologies</li><li>Long-term impact assessments</li><li>Regulatory considerations and compliance frameworks</li><li>Cross-industry application patterns</li></ul><p>Further research is needed to fully understand the longitudinal effects of ${params.trend}, particularly in highly regulated industries where adoption patterns differ significantly.</p>`,
    model: "perplexity-online",
    usage: {
      totalTokens: 420,
    },
  };
};

// Helper function to construct prompts based on parameters
const constructPrompt = (params: AIRequestParams): string => {
  const { trend, tone, length, seoOptimized, customInstructions } = params;

  let prompt = `Generate content about ${trend}.`;

  if (tone) {
    prompt += ` Use a ${tone} tone.`;
  }

  if (length) {
    prompt += ` The content should be approximately ${length} words.`;
  }

  if (seoOptimized) {
    prompt += ` Optimize the content for SEO with relevant keywords.`;
  }

  if (customInstructions) {
    prompt += ` Additional instructions: ${customInstructions}`;
  }

  return prompt;
};

// Main function to generate content based on selected model
export const generateContent = async (
  params: AIRequestParams,
): Promise<AIResponse> => {
  const { model } = params;

  switch (model) {
    case "openai":
      return generateWithOpenAI(params);
    case "gemini":
      return generateWithGemini(params);
    case "perplexity":
      return generateWithPerplexity(params);
    case "anthropic":
      // For future implementation
      return {
        content: "<p>Anthropic Claude integration is coming soon.</p>",
        model: "anthropic-claude",
        error: "Anthropic integration not yet implemented",
      };
    default:
      return generateWithOpenAI(params); // Default to OpenAI
  }
};
