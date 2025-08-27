package seraph.GJLeague.scoreBoard;

import android.accounts.AccountManager;
import android.content.Intent;
import android.content.IntentSender;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;


import java.util.ArrayList;

import io.paperdb.Paper;
import seraph.GJLeague.scoreBoard.Utils.ChromeClient_with_Progress;

public class MainActivity extends AppCompatActivity {
    private AppUpdateManager mAppUpdateManager;
    ProgressBar progressBar;
    RelativeLayout relativeLayout;
    private WebView wv;

    private static final int RC_APP_UPDATE=100;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        wv = findViewById(R.id.manager_watv_wv);
        progressBar = findViewById(R.id.manager_watvProgressBar);
        relativeLayout = findViewById(R.id.manager_watvRelatLayout);
        progressBar.setMax(100);

// Enable JS and DOM storage
        WebSettings webSettings = wv.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);

// Handle back button in WebView
        wv.setOnKeyListener((v, keyCode, event) -> {
            if (event.getAction() == KeyEvent.ACTION_DOWN && keyCode == KeyEvent.KEYCODE_BACK) {
                if (wv.canGoBack()) {
                    wv.goBack();
                    return true;
                }
            }
            return false;
        });
        String userType = getIntent().getStringExtra("userType");
        String url_of_GAS ="https://133usr.github.io/7770km-to-Mother/";
        if (userType != null) {
            if (userType.contains("Play_Console_Test")) {
                url_of_GAS = "https://133usr.github.io/7770km-to-Mother/";
                Toast.makeText(this, "This is a Heavy Scoreboard", Toast.LENGTH_LONG).show();
                Toast.makeText(this, "Please wait atleast 10 Seconds...", Toast.LENGTH_LONG).show();
            }else if (userType.contains("ZionUser")) {
                url_of_GAS = "https://script.google.com/macros/s/AKfycbweQNldHXfX09V-1X1-dq89w4NoVIBnQv7cjdJchqKVV_U0Ic3M31PLWVPsRGPC08zh9Q/exec";
            }
        }

            Log.d("URL_", "Received: " + url_of_GAS);

            wv.setWebViewClient(new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    view.loadUrl(url);
                    return true;
                }

                @Override
                public void onPageFinished(WebView view, String url) {
                    // JS to hide #warning
                    wv.loadUrl("javascript:(function(){setTimeout(function(){try{document.querySelector('#warning').style.display='none';}catch(e){}}, 1000);})();");
                }
            });

            ChromeClient_with_Progress chromeClient_with_progress = new ChromeClient_with_Progress(progressBar, this);
            wv.setWebChromeClient(chromeClient_with_progress);

            wv.loadUrl(url_of_GAS);



        //Update setttings
        mAppUpdateManager = AppUpdateManagerFactory.create(this);
        Task<AppUpdateInfo> appUpdateInfoTask = mAppUpdateManager.getAppUpdateInfo();


        mAppUpdateManager.getAppUpdateInfo().addOnSuccessListener(new OnSuccessListener<AppUpdateInfo>() {
            @Override
            public void onSuccess(AppUpdateInfo result) {
                if(result.updateAvailability()== UpdateAvailability.UPDATE_AVAILABLE
                        && result.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE))
                {
                    try {
                        mAppUpdateManager.startUpdateFlowForResult(result,AppUpdateType.IMMEDIATE,MainActivity.this,
                                RC_APP_UPDATE);
                    } catch (IntentSender.SendIntentException exception) {
                        exception.printStackTrace();
                    }
                }
            }
        });
        // Set an OnKeyListener to capture the back key press

    }



    // must update or don't use my app
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        /*TODO// FOR THE APP UPDATE STATUS*/
        if(requestCode==RC_APP_UPDATE && resultCode!= RESULT_OK)
        {
            Toast.makeText(this, "You can't continue without Update!\nGod Bless You~!", Toast.LENGTH_SHORT).show();
            Toast.makeText(MainActivity.this, "New Version Available~", Toast.LENGTH_LONG).show();
            Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=seraph.GJLeague.scoreBoard"));
            startActivity(i);
            finish();
            super.onBackPressed();
        }

        super.onActivityResult(requestCode, resultCode, data);

    }



}
